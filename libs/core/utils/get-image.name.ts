/**
 * Return image name.
 * Usually, image is in a format like
 * "https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/
 * anime/images/02de727c-11b3-4018-b2ba-f41ec454e76d/
 * apple-touch-icon-256.png"
 * where the last part is image name.
 * @param imageUrl Image url.
 */
export function getImageName(imageUrl: string): string {
	return imageUrl.slice(111);
}
