
export default class AppSettings {
    previousProjectFilePath;

    constructor(data) {
        if (data) {
            this.previousProjectFilePath = data.previousProjectFilePath;
        }
    }
}