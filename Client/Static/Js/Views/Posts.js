import ParentView from "./ParentView.js";

export default class extends ParentView {
    constructor(argument) {
        super(argument);
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
            <h1>Posts</h1>
            <p>You are viewing the posts on this app.<br> Don't forget to follow me for more codes</p>
        `;
    }
    async getCss(){
        return [`/Static/Css/app.css`];
    }
}