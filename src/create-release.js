import _gitHead from "git-head";
import GitHub from "github";
import promisify from "es6-promisify";
import {resolve} from "path";
import parseGithubUrl from "parse-github-url";
import url from "url";
import SemVer from "semver";

const gitHead = promisify(_gitHead);

export default async function(log, {
	basedir = ".",
	package: pkg,
	githubToken = process.env.GH_TOKEN,
	githubUrl = process.env.GH_URL,
	githubApiPathPrefix,
	draftMode
}) {
	let ghConfig = githubUrl ? url.parse(githubUrl) : {};
	let github = new GitHub({
		version: "3.0.0",
		port: ghConfig.port,
		protocol: (ghConfig.protocol || "").split(":")[0] || null,
		host: ghConfig.hostname,
		pathPrefix: githubApiPathPrefix || null
	});

	github.authenticate({
		type: "oauth",
		token: githubToken
	});

	let head = await gitHead(resolve(basedir, ".git"));
	let ghRepo = parseGithubUrl(pkg.repository.url);
	let version = new SemVer(pkg.version);
	let name = "v" + version.toString();

	await new Promise((resolve, reject) => {
		github.releases.createRelease({
			owner: ghRepo.owner,
			repo: ghRepo.name,
			name: name,
			tag_name: name,
			target_commitish: head,
			draft: Boolean(draftMode),
			body: log,
			prerelease: Boolean(version.prerelease.length)
		}, (err, res) => {
			err ? reject(err) : resolve(res);
		});
	});
}
