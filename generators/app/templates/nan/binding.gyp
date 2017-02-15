{
    "targets": [
        {
            "target_name": "<%= name %>",
            "sources": [ "./src/<%= name %>.cpp", "./src/functions.cpp" ],
            "include_dirs" : [
 	 			"<!(node -e \"require('nan')\")"
			],
            'libraries' : [
            ]
        }
    ],
}