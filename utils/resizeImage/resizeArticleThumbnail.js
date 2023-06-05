const sharp = require('sharp');
const { join } = require('node:path');

module.exports.resizeArticleThumbnail = async (articleId, file) => {
	const  thumbnail   = file;
    console.log(thumbnail);
	const articleThumbnailFilename = `articles-${articleId}-${Date.now()}.jpeg`;

	await sharp(thumbnail.buffer)
		.resize(1200, 800)
		.toFormat('jpeg')
		.jpeg({ quality: 95 })
		.toFile(
			join(
				__dirname,
				`../public/images/articles/thumbnailPic/${articleThumbnailFilename}`
			)
		);

	return articleThumbnailFilename;
};