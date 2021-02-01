# This is the readme file for TUI API
## This API is build on typescript and nodejs

* the api just takes username parameter as querystring 
* it returns the list of repository that user has on github

[Sample URL](http://localhost:3000/getInfo?username={username})

* Output format
```json
{
	"login": "******",
	"repos": [
		{
			"name": "****",
			"ownerLogin": "********",
			"branches": [
				{
					"name": "master",
					"lastCommit": "a18dbaf8fcca2e60b05b44a14b226cd4f93d1324"
				}
            ]
        }
	]
}