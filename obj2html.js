(function(){


module.exports = {
	gen_main_html:function(data){
		console.log('gen_main_html');
		var site = "http://yushengc.twbbs.org:9090/blog/";
		var public_html_content = "<!DOCTYPE html>";
		public_html_content += "<html>\n";
		public_html_content += "<head>\n";
		public_html_content += "</head>\n";
		public_html_content += "<body>\n";
		public_html_content += data;
		public_html_content += "</body>\n";
		public_html_content += "</html>";
		var public_html_content = "<!DOCTYPE html>\n";
		public_html_content += "<html lang=\"en\">\n";
		public_html_content += " <head> \n";
        	public_html_content += " <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /> \n";
		public_html_content += " <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"> \n";
		public_html_content += " <meta name=\"author\" content=\"Lab X yushengc\">\n";
		public_html_content += " <meta name=\"copyright\" content=\"yushengc 2017 all rights Reserved.\"> \n";

		public_html_content += " <link rel=\"shortcut icon\" href=\"../images/favi-icon.png\" > \n";

		public_html_content += " <!-- jQuery --> \n";
		public_html_content += " <script type=\"text/javascript\" src=\"../library/jquery/jquery-1.9.0.min.js\"></script> \n";

		public_html_content += " <!-- jQuery UI--> \n";
		public_html_content += "<link type=\"text/css\" rel=\"stylesheet\" href=\"../library/jquery-ui/css/ui-lightness/jquery-ui-1.10.0.custom.css\"> \n";
		public_html_content += " <script type=\"text/javascript\" src=\"../library/jquery-ui/js/jquery-ui-1.10.0.custom.min.js\"></script> \n";
		public_html_content += " <!-- Bootstrap --> \n";
		public_html_content += " <link type=\"text/css\" rel=\"stylesheet\" href=\"../library/bootstrap/css/bootstrap.min.css\"> \n";
		public_html_content += " <script type=\"text/javascript\" src=\"../library/bootstrap/js/bootstrap.min.js\"></script> \n";
		public_html_content += " <!-- prettify --> \n";
		public_html_content += "<link type=\"text/css\" rel=\"stylesheet\" href=\"../library/prettify/prettify.css\"> \n";
		public_html_content += " <script type=\"text/javascript\" src=\"../library/prettify/prettify.js\"></script> \n";
		public_html_content += " <!-- Font --> \n";
		public_html_content += "<link type=\"text/css\" rel=\"stylesheet\" href=\"../css/font-face.css\"> \n";
		public_html_content += " <link href='http://fonts.googleapis.com/css?family=Londrina+Shadow' rel='stylesheet' type='text/css'>\n";
		public_html_content += " <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'> \n";
		public_html_content += " <!-- Font Awsome--> \n";
		public_html_content += " <link type=\"text/css\" rel=\"stylesheet\" href=\"../css/font-awesome.css\"> \n";
		public_html_content += " <!-- Site Universal Style --> \n";
		public_html_content += " <link type=\"text/css\" rel=\"stylesheet\" href=\"../css/lab_site.css\"> \n";
		public_html_content += " <script type=\"text/javascript\"> \n";
		public_html_content += " $(document).ready(function(){\n";
		public_html_content += " prettyPrint(); \n";
		public_html_content += " });\n";
		public_html_content += " </script> \n";


		public_html_content += " <meta name=\"description\" content=\"25sprout Lab Website, we share some useful or interesting tools here.\">\n";
		public_html_content += "<meta name=\"keywords\" content=\"CSS, HTML, Lab, Tools, jQuery\" /> \n";
		public_html_content += " <meta name=\"URL\" content=\"http://www.25sprout.com/25lab/\">\n";
		public_html_content += " <meta name=\"image\" content=\"http://lab.25sprout.com/images/share-image.jpg\" /> \n";
		public_html_content += " <meta name=\"og:image\" content=\"http://lab.25sprout.com/images/share-image.jpg\"> \n";

		public_html_content += " <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=0\"> \n";
		public_html_content += " <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"> \n";

		public_html_content += " <title>Yu-Sheng X Blog</title>\n";

		public_html_content += " <link type=\"text/css\" rel=\"stylesheet\" href=\"../css/style.css\"> \n";
		public_html_content += "<link type=\"text/css\" rel=\"stylesheet\" href=\"../css/style_responsive.css\"> \n";

		public_html_content += " <script type=\"text/javascript\" src=\"../js/lab-main.js\"></script> \n";
		public_html_content += " </head> \n";

		public_html_content += "<body> \n";
		public_html_content += " <header> \n";
		public_html_content += " <a id=\"title\" href=\"http://yushengc.twbbs.org:9090\\blog\\\"><img src=\"../images/logo.png\"></a> \n";
		public_html_content += " <div class=\"links\"> \n";

		public_html_content += " <a href=\"http://yushengc.twbbs.org:9090\\blog\\\" class=\"links-1\"></a> \n";
		public_html_content += " </div> \n";
		public_html_content += " </header> \n";
	
		public_html_content += " <div class=\"container\"> \n";
		public_html_content += " <div class=\"clear-both\"></div> \n";

		public_html_content += " <div class='content-wrapper'> \n";
		public_html_content += data;
		public_html_content += " </div> \n";
		public_html_content += " </div> \n";  
		public_html_content += " </body> \n";
		public_html_content += " </html> \n";

		return public_html_content;
	},
}

if(!module.parent){
	if(process.argv[2]){
		console.log('Testing string is '+process.argv[2]);
		//console.log('there are '+process.argv.length-2+ ' user defined test string');
		var tokens = module.exports.lexical(process.argv[2]);
	}else{
		var tokens = module.exports.lexical('test 3 times');
	}
}
})();
