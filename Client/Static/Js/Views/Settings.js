import ParentView from "./ParentView.js";

export default class extends ParentView {
    constructor(argument) {
        super(argument);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
        `;
    }
}