export class NewData {
    constructor(id, ownerId, title, subtitle, date, paragraphs = [], images = [], visibility = "public") {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.subtitle = subtitle;
        this.date = date;
        this.paragraphs = paragraphs;
        this.images = images;
        this.visibility = visibility;
    }
}