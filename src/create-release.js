import _gitHead from "git-head";
import GitHubi from "github";
import promisify from "es6-promisify";
import {resolve} from "path";
import parseGithubUrl from "parse-github-url";
import url from "url";

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
	let github = new GitHubi({
		version: '3.0.0',
		port: ghConfig.port,
		protocol: (ghConfig.protocol || '').split(':')[0] || null,
		host: ghConfig.hostname,
		pathPrefix: githubApiPathPrefix || null
	});

	github.authenticate({
		type: 'oauth',
		token: githubToken
	});

	let head = await gitHead(resolve(basedir, ".git"));
	let ghRepo = parseGithubUrl(pkg.repository.url);

	await new Promise((resolve, reject) => {
		github.releases.createRelease({
			owner: ghRepo.owner,
			repo: ghRepo.repo,
			name: 'v' + pkg.version,
			tag_name: 'v' + pkg.version,
			target_commitish: head,
			draft: Boolean(draftMode),
			body: log
		}, (err) => {
			err ? reject(err) : resolve();
		});
	});
}
