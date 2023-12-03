/// <reference types="Cypress" />
import 'cypress-file-upload';
describe("File upload", () => {
    it("upload size test pdf", () => {
        const filesToUpload = [
            { path: 'test_files/pdf/100KB.pdf', name:'100KB.pdf', type: 'application/pdf' },
            { path: 'test_files/pdf/260KB.pdf', name:'260KB.pdf', type: 'application/pdf' },
            { path: 'test_files/pdf/350KB.pdf', name:'350KB.pdf', type: 'application/pdf' },
            { path: 'test_files/pdf/500KB.pdf', name:'500KB.pdf', type: 'application/pdf' },
            { path: 'test_files/pdf/800KB.pdf', name:'800KB.pdf', type: 'application/pdf' },
            { path: 'test_files/pdf/1MB.pdf', name:'1MB.pdf', type: 'application/pdf' },
            { path: 'test_files/pdf/1.5MB.pdf', name:'1.5MB.pdf', type: 'application/pdf' },
            { path: 'test_files/pdf/10.5MB.pdf', name:'10.5MB.pdf', type: 'application/pdf' },
        ];
        cy.visit("http://localhost:3000/");
        cy.get("input").type("Anna");
        cy.get("button").click();
        cy.get("[data-testid='chat-button']").click();
        cy.task("socket:connect");
        filesToUpload.forEach((file) => {
            cy.get(`[data-testid="file-upload-button"]`).click();
            cy.get(`[id="file-input"]`).attachFile({
                filePath: file.path,
                mimeType: file.type,
            });
            cy.get(`[data-testid="send-msg-button"]`).click();
            cy.get('[data-testid="chat"]').should(
                "contain.text",
                file.name
            );
        })
    });

    it("upload size test audio", () => {
        const filesToUpload = [
            { path: 'test_files/audio/100KB.mp3', name:'100KB.mp3', type: 'audio/mp3' },
            { path: 'test_files/audio/500KB.mp3', name:'500KB.mp3', type: 'audio/mp3' },
            { path: 'test_files/audio/1MB.mp3', name:'1MB.mp3', type: 'audio/mp3' },
            { path: 'test_files/audio/2MB.mp3', name:'2MB.mp3', type: 'audio/mp3' },
        ];
        cy.visit("http://localhost:3000/");
        cy.get("input").type("Anna");
        cy.get("button").click();
        cy.get("[data-testid='chat-button']").click();
        cy.task("socket:connect");
        filesToUpload.forEach((file) => {
            cy.get(`[data-testid="file-upload-button"]`).click();
            cy.get(`[id="file-input"]`).attachFile({
                filePath: file.path,
                mimeType: file.type,
            });
            cy.get(`[data-testid="send-msg-button"]`).click();
            cy.get('[data-testid="chat"]').should(
                "contain.text",
                file.name
            );
        })
    });

    it("upload size test img", () => {
        const filesToUpload = [
            { path: 'test_files/img/500kb.png', name:'500kb.png', type: 'image/png' },
            { path: 'test_files/img/1mb.png', name:'1mb.png', type: 'image/png' },
            { path: 'test_files/img/5mb.png', name:'5mb.png', type: 'image/png' },
        ];
        cy.visit("http://localhost:3000/");
        cy.get("input").type("Anna");
        cy.get("button").click();
        cy.get("[data-testid='chat-button']").click();
        cy.task("socket:connect");
        filesToUpload.forEach((file) => {
            cy.get(`[data-testid="file-upload-button"]`).click();
            cy.get(`[id="file-input"]`).attachFile({
                filePath: file.path,
                mimeType: file.type,
            });
            cy.get(`[data-testid="send-msg-button"]`).click();
            cy.get('[data-testid="chat"]').should(
                "contain.text",
                file.name
            );
        })
    });

    it("upload size test video", () => {
        const filesToUpload = [
            { path: 'test_files/video/1MB.mp4', name:'1MB.mp4', type: 'video/mp4' },
            { path: 'test_files/video/2MB.mp4', name:'2MB.mp4', type: 'video/mp4' },
        ];
        cy.visit("http://localhost:3000/");
        cy.get("input").type("Anna");
        cy.get("button").click();
        cy.get("[data-testid='chat-button']").click();
        cy.task("socket:connect");
        filesToUpload.forEach((file) => {
            cy.get(`[data-testid="file-upload-button"]`).click();
            cy.get(`[id="file-input"]`).attachFile({
                filePath: file.path,
                mimeType: file.type,
            });
            cy.get(`[data-testid="send-msg-button"]`).click();
            cy.get('[data-testid="chat"]').should(
                "contain.text",
                file.name
            );
        })
    });
});