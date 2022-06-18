const cherio = require("cherio");
const request = require("request");

const imageStorageRepository = require("../repository/imageStorageRepository");

class ImageStorageService {
  async get() {
    return await imageStorageRepository.get();
  }

  async create(data) {
    const { url } = data;

    if (!url) throw "Erro ao carregar URL!";

    const dataImages = [];

    request(url, (err, resp, html) => {
      if (!err && resp.statusCode == 200) {
        const $ = cherio.load(html);

         $("img").each((index, image) => {
          var img = $(image).attr("src");

          const data = {
            baseUrl: url,
            url: img,
          };

          dataImages.push(data);
        });

        if (dataImages && dataImages.length > 0) {
          imageStorageRepository.deleteByBaseUrl(url);
          imageStorageRepository.createMany(dataImages);
        }
      }
    });
  }
}

module.exports = new ImageStorageService();
