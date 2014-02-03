<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>SiteMarks bookmarklet</title>
		<link rel="stylesheet" href="bower_components/twitter/dist/css/bootstrap.css">
		<link rel="stylesheet" href="bower_components/github-fork-ribbon-css/gh-fork-ribbon.css">
		<!--[if lt IE 9]>
		<link rel="stylesheet" href="bower_components/github-fork-ribbon-css/gh-fork-ribbon.ie.css">
		<![endif]-->
		<style>
			body {
				padding-top: 50px;
			}
			@media (min-width: 768px) {
				.container {
					max-width: 730px;
				}
			}
			.btn {
				margin-top: 1em;
				padding: .8em;
				font-size: 1.8em;
				text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
			}
		</style>
	</head>
	<body>
		<div class="github-fork-ribbon-wrapper right">
			<div class="github-fork-ribbon">
				<a href="https://github.com/simonwhitaker/github-fork-ribbon-css">Fork me on GitHub</a>
			</div>
		</div>
		<div class="container jumbotron">
			<div class="row">
				<div class="col-xs-12">
					<h1>SiteMarks bookmarklet</h1>
					<div>
						<p>SiteMarks is a bookmarklet that lets you persistantly store links to pages from sites you browse on the web.</p>
						<p>Stored SiteMarks will only appear in the SiteMarks UI once you browse the site from which the links are added.</p>
						<p>Install the bookmarklet by dragging the button to your browser toolbar.</p>
						<a class="btn btn-primary btn-lg btn-block" href='javascript:void<%= code %>'>SiteMarks bookmarklet<a/>
					</div>
				</div>
			</div>
		</div>

	</body>
</html>