(function()
{
	var count = 0;
	var countMax = 10;
	var intervalStep = 100;
	var interval = intervalStep;

	var nodeIdPrefix = '_no-clickjacking-';
	var nodeIdCount = 0;
	var strikes = {};

	var flag = 0;

	//main working starts here
	var detect = setTimeout(function()
	{
	
	
		//console.log('detecting...', count, interval);

		//getting all clickable elements
		var iframes = document.querySelectorAll('iframe,a,button') ;
		//to store invisible elemnts
		var transparentNodeIds = [];
		//visibility check for each clickable element
		for (var i in iframes)
		{

			var iframe = iframes[i];
			var node = iframe;
			//clickable element
		//	console.log(iframe);

			while(node)
			{
				try
				{
				//getting style of the element
				var style = getComputedStyle(node);
				//var style = node.currentStyle;
				}
				catch(err)
				{
					console.log('i-frame');
				}		
				//checking for invisible element
				if (style && parseFloat('0' + style.opacity) < 0.1)
				{
									
					console.log('found invisible', node);

					// reset interval to check as fast as possible
					interval = intervalStep;
					count = 0;
					//storing id (#) of invisible element
					var nodeId = node.id;
					//adding id to node if not assigned
					if (!nodeId)
					{
						nodeId = nodeIdPrefix + nodeIdCount;
						nodeIdCount++;
						node.id = nodeId;
					}
					transparentNodeIds.push(nodeId);
				}

				node = node.parentNode;
			}
		}
		//for each detected element...changing style
		if (transparentNodeIds.length > 0)
		{
			var css = '';
			flag = 1;
			for (var i in transparentNodeIds)
			{
				var nodeId = transparentNodeIds[i];
				var node = document.getElementById(nodeId);

					//node.style.opacity = 1;
					//node.style.overflow = 'visible';
					css += '#' + nodeId + '{opacity:1 !important;overflow: visible !important; }';


				//}
			}

			//embeding modefied style to web page
			if (css.length > 0)
			{
				var style = document.createElement('style');
				style.innerText = css;
				document.getElementsByTagName('head')[0].appendChild(style);
			}
			//notifying user
			if (flag == 1) {alert("Invisible elements detected on this page...we are increasing their visibility...we recomment to be careful and it is advised not use this page!");};
		}

		
		if (count < countMax)
		{
			count++;
			interval += count * intervalStep;
			window.setTimeout(detect, interval);
		}
		
		else
		{
			console.log('stopped');
		}

		//checking for cursor spoofing
		//getting cursor properties
		try{
		var style = getComputedStyle(cursor);
		}
		catch(err)
		{
			console.log('cursor');
		}
		if (style.cursor == 'none')
		{
			console.log('found cursor customisation');
			alert("customized cursor detected...!!!original pointer is now visible, it is advised not to use this page!");
			var style = document.createElement('style');
			style.innerText = 'body {cursor:default !important;}';
			document.getElementsByTagName('head')[0].appendChild(style); 
		}
	}, 1000);

		//calling detect function 
		detect();

})();