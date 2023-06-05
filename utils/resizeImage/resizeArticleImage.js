module.exports.resizeArticleImages = async (articleId, files) => {
	const { images = [] } = files;

	if (!images.length) return images;

	const articleImagesFilenames = await Promise.all(
		images.map(async (image, index) => {
			const imageFilename = `articles-${articleId}-${Date.now()}-${
				index + 1
			}.jpeg`;

			await sharp(image.buffer)
				.resize(1000, 600)
				.toFormat('jpeg')
				.jpeg({ quality: 95 })
				.toFile(
					join(__dirname, `../public/images/articles/images/${imageFilename}`)
				);

			return imageFilename;
		})
	);

	return articleImagesFilenames;
};