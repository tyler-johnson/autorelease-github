
export default function(r, opts={}) {
	let {package:pkg} = opts;

	if (!pkg.repository || !pkg.repository.url) {
		throw new Error(`No "repository" found in package.json.`);
	}

	if (!opts.githubToken && !process.env.GH_TOKEN) {
		throw new Error("No github token specified.");
	}
}
