function generateRandomSuffix(length = 10) {
	return Array.from({ length }, () =>
		Math.random().toString(36).charAt(2),
	).join("");
}

function slugify(value = "") {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export { generateRandomSuffix, slugify };
