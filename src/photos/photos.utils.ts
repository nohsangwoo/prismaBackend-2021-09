export const processHashtags = (caption: String) => {
  const hashtags = caption.toLowerCase().match(/#[\w]+/g) || [];
  const result = hashtags.map(hashtag => ({
    where: {
      hashtag
    },
    create: {
      hashtag
    }
  }));
  return result;
};
