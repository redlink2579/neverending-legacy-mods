G.AddData({
	name:'Mega Map',
	author:'Owen "Ohead" Parker',
	desc:'Doubles the height of the map and the width of the map',
	engineVersion:1,
	func:function()
	{
		G.createMaps=function()//when creating a new game
		{
			G.currentMap=new G.Map(0,48,48);//main world map

			//set starting tile by ranking all land tiles by score and picking one
			var goodTiles=[];
			for (var x=1;x<G.currentMap.w-1;x++)
			{
				for (var y=1;y<G.currentMap.h-1;y++)
				{
					var land=G.currentMap.tiles[x][y].land;
					if (!land.ocean) goodTiles.push([x,y,(land.score||0)+Math.random()*2]);
				}
			}
			goodTiles.sort(function(a,b){return b[2]-a[2]});
			var tile=0;
			if (G.startingType==2) tile=choose(goodTiles);//just drop me wherever
			else
			{
				var ind=0;
				if (G.startingType==1) ind=Math.floor((0.85+Math.random()*0.15)*goodTiles.length);//15% worst
				//ind=Math.floor((0.3+Math.random()*0.4)*goodTiles.length);//30% to 70% average
				else ind=Math.floor((Math.random()*0.15)*goodTiles.length);//15% nicest
				tile=goodTiles[ind];
			}
			tile=G.currentMap.tiles[tile[0]][tile[1]];
			tile.owner=1;
			tile.explored=10/100;//create one tile, a tenth of it explored

			G.updateMapForOwners(G.currentMap);

			G.updateMapDisplay();
			G.centerMap(G.currentMap);
		}
	}
});
