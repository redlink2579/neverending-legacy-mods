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
		/*
		console.log('Map mod loaded!');
		G.funcs['create map']=function(w,h)
		{
			let newMapSize = 2;
			console.log('Big map executed!');
			w*=newMapSize;
			h*=newMapSize;
			//generate basic geography using Conway's Game of Life (rule : births from 4 to 9 neighbors, survival from 6 to 9 neighbors)
			
			var generate=function(w,h)
			{
				var getAt=function(map,x,y)
				{
					//if (x<0||x>=map.length||y<0||y>=map[0].length) return 0;
					//wrap around so we don't get big empty spots on the edges (as a bonus, this creates donut-shaped worlds)
					if (x<0) x+=map.length;
					else if (x>=map.length) x-=map.length;
					if (y<0) y+=map[0].length;
					else if (y>=map[0].length) y-=map[0].length;
					return map[x][y];
				}
				
				//init map
				var lvl=[];
				for (var x=0;x<w;x++)
				{
					lvl[x]=[];
					for (var y=0;y<h;y++)
					{
						lvl[x][y]=Math.random()<0.5?1:0;
					}
				}
				
				//init buffer
				var lvlBuffer=[];
				for (var x=0;x<w;x++){lvlBuffer[x]=[];for (var y=0;y<h;y++){lvlBuffer[x][y]=0;}}
				
				var passes=1;
				for (var i=0;i<passes;i++)
				{
					//live
					for (var x=0;x<w;x++)
					{
						for (var y=0;y<h;y++)
						{
							var n=getAt(lvl,x-1,y)+getAt(lvl,x-1,y-1)+getAt(lvl,x,y-1)+getAt(lvl,x+1,y-1)+getAt(lvl,x+1,y)+getAt(lvl,x+1,y+1)+getAt(lvl,x,y+1)+getAt(lvl,x-1,y+1);
							var on=lvl[x][y];
							if (on && n>=4 && n<=9) on=1; else on=0;
							if (!on && n>=6 && n<=9) on=1;
							if (Math.random()<0.05) on=Math.random()<0.5?1:0;//just a bit of extra randomness
							lvlBuffer[x][y]=on;
						}
					}
					//copy buffer back
					for (var x=0;x<w;x++){for (var y=0;y<h;y++){lvl[x][y]=lvlBuffer[x][y];}}
				}
				
				return lvl;
			}
			
			var getStrAt=function(map,x,y)
			{
				if (x<0||x>=map.length-1||y<0||y>=map[0].length-1) return 'out';
				return map[x][y];
			}
			var getAt=function(map,x,y)
			{
				if (x<0||x>=map.length-1||y<0||y>=map[0].length-1) return 0.5;
				return map[x][y];
			}
			
			var landTiles=[];
			var seaTiles=[];
			var fit=false;
			i=0;
			while (i<20 && fit==false)//discard any map with less than 30% or more than 50% land
			{
				var lvl=generate(w,h);
				
				landTiles=[];
				seaTiles=[];
				for (var x=0;x<w;x++)
				{
					for (var y=0;y<h;y++)
					{
						if (lvl[x][y]==0) seaTiles.push([x,y]);
						else landTiles.push([x,y]);
					}
				}
				var total=landTiles.length+seaTiles.length;
				if (landTiles.length/total>0.3 && landTiles.length/total<0.5) fit=true;
				i++;
			}
			
			//translate into terrain
			for (var x=0;x<w;x++)
			{
				for (var y=0;y<h;y++)
				{
					var land='ocean';
					if (lvl[x][y]==0) land='ocean';
					else if (lvl[x][y]==1)
					{
						land='none';
					}
					lvl[x][y]=land;
				}
			}
			
			//precipitation map
			//generate more humidity over sea, less in land - with some variance
			//on tiles with low humidity, 30% of the time, add some huge variance
			//then, blur the map so that coasts get some humidity and variance can spread
			var wet=[];
			for (var x=0;x<w;x++)
			{
				wet[x]=[];
				for (var y=0;y<h;y++)
				{
					wet[x][y]=(lvl[x][y]=='ocean'?0.8:0.2)+Math.random()*0.1-0.1/2;
					if (Math.random()<0.3 && wet[x][y]<0.5) wet[x][y]+=Math.random()*5-2.5;
				}
			}
			for (var x=0;x<w;x++)//blur
			{
				for (var y=0;y<h;y++)
				{
					var variance=0.05;
					var n=getAt(wet,x-1,y)+getAt(wet,x-1,y-1)+getAt(wet,x,y-1)+getAt(wet,x+1,y-1)+getAt(wet,x+1,y)+getAt(wet,x+1,y+1)+getAt(wet,x,y+1)+getAt(wet,x-1,y+1);
					wet[x][y]=(wet[x][y]+n)/9+Math.random()*variance-variance/2;
				}
			}
			//temperature map. why not
			var jumble=false;
			if (!jumble)
			{
				//vertical sine wave (so we get hot equator and cold poles), with some variance
				//humidity lowers temperature by a bit
				var temp=[];
				for (var x=0;x<w;x++)
				{
					temp[x]=[];
					for (var y=0;y<h;y++)
					{
						var variance=0.15;
						temp[x][y]=Math.sin(((y+0.5)/h-0.25)*Math.PI*2)/2+(lvl[x][y]=='ocean'?0.6:0.5)-(wet[x][y])*0.15+Math.random()*variance-variance/2;
					}
				}
			}
			else
			{
				//temperature spawns in big blobs of cold and hot
				var temp=[];
				for (var x=0;x<w;x++)
				{
					temp[x]=[];
					for (var y=0;y<h;y++)
					{
						temp[x][y]=0.65+Math.random()*0.1-0.1/2-wet[x][y]*0.15;
						if (Math.random()<0.5) temp[x][y]+=Math.random()*10-5;
					}
				}
				for (var i=0;i<2;i++)//blur
				{
					for (var x=0;x<w;x++)
					{
						for (var y=0;y<h;y++)
						{
							var variance=0.05;
							var n=getAt(temp,x-1,y)+getAt(temp,x-1,y-1)+getAt(temp,x,y-1)+getAt(temp,x+1,y-1)+getAt(temp,x+1,y)+getAt(temp,x+1,y+1)+getAt(temp,x,y+1)+getAt(temp,x-1,y+1);
							temp[x][y]=(temp[x][y]+n)/9+Math.random()*variance-variance/2;
						}
					}
				}
			}
			
			//biomes
			for (var x=0;x<w;x++)
			{
				for (var y=0;y<h;y++)
				{
					var tempTile=temp[x][y];
					var wetTile=wet[x][y];
					var landTile=lvl[x][y];
					
					var biomes=[];
					if (tempTile<-0.1)
					{
						if (landTile=='ocean') biomes.push('arctic ocean');
						else biomes.push('ice desert');
					}
					else if (tempTile<0.15)
					{
						if (landTile=='ocean') biomes.push('arctic ocean');
						else if (wetTile<0.25) biomes.push('ice desert');
						else if (wetTile>0.5) biomes.push('boreal forest');
						else biomes.push('tundra');
					}
					else if (tempTile>1.1)
					{
						if (landTile=='ocean') biomes.push('tropical ocean');
						else biomes.push('desert');
					}
					else if (tempTile>0.85)
					{
						if (landTile=='ocean') biomes.push('tropical ocean');
						else if (wetTile<0.25) biomes.push('desert');
						else if (wetTile>0.5) biomes.push('jungle');
						else biomes.push('savanna');
					}
					else
					{
						if (landTile=='ocean') biomes.push('ocean');
						else if (wetTile<0.25) biomes.push('shrubland');
						else if (wetTile>0.5) biomes.push('forest');
						else biomes.push('prairie');
					}
					if (biomes.length==0) biomes.push('prairie');
					lvl[x][y]=choose(biomes);
				}
			}
			
			for (var x=0;x<w;x++)//clean all tiles with no terrain
			{
				for (var y=0;y<h;y++)
				{
					if (lvl[x][y]=='none') lvl[x][y]='forest';
				}
			}
			return lvl;
		}
	}*/
});
