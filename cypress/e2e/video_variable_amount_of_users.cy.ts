/// <reference types="Cypress" />

let amountOfOtherPeers = 5;

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

function simulateNUsersJoining(roomId: string, numberOfUsers: number) {
  for (let i = 0; i < numberOfUsers; i++) {
    cy.task("joinRoom", {
      roomId,
      peerId: "user" + generateRandomString(),
      userName: "Tester" + generateRandomString(),
    });
    cy.wait(1000); // wait some small amount of time to let the first peer join
  }
}

describe("Video chat", () => {
  it("shows configurable streams from peers", () => {
    cy.visit("http://localhost:3000/");
    cy.window().then((win) => {
      // @ts-ignore
      win.Peer.prototype.call = cy.stub().returns({
        on: (_, callback) => {
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              callback(stream);
            });
        },
      });
    });
    cy.get("input").type("Anna");
    cy.get("button").click();
    cy.task("socket:connect");
    cy.url().then((url) => {
      console.log({ url });
      const roomId = url.split("/").reverse()[0];
      console.log({ roomId });
      simulateNUsersJoining(roomId, amountOfOtherPeers);
    });

    cy.get(`[data-testid="peer-video"]`).should(
      "have.length",
      amountOfOtherPeers + 1
    );
  });
});
