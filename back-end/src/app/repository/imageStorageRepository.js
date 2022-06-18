const ImageStorage = require("../models/imageStorage");

class ImageStorageRepository {
  async get() {
    return await ImageStorage.find({ active: true });
  }

  async create(data) {
    return ImageStorage.create(data);
  }

  async createMany(data) {
    return ImageStorage.insertMany(data);
  }

  async deleteByBaseUrl(baseUrl) {
    return ImageStorage.deleteMany({ baseUrl: baseUrl });
  }
}

module.exports = new ImageStorageRepository();
