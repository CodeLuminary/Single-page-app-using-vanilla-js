import ParentView from "./ParentView.js";

export default class extends ParentView {
    constructor(argument) {
        super(argument);
        this.postId = argument.id;
        this.setTitle("Viewing Post");
    }

    async getHtml() {
        return `
            <h1>Post</h1>
            <p>You are viewing post #${this.postId}.</p>
            
        `;
    }
    
    async getCss(){
        return [];
    }
}
