G.AddData({
	name:'Agriculture',
	author:'Owen "Ohead" Parker',
	desc:'Adds various farming units.',
	engineVersion:1,
    sheets:{'agriculture':'https://therealohead.github.io/neverending-legacy-mods/mods/agriculture/img/icons.png'},
	func:function()
	{   
        G.contextNames['grow']='Growing';

        new G.Tech({
            name:'agriculture',
            desc:'@unlocks [orchard]s, which provide [fruit] much faster than a gather can.<>@unlocks [grain farm]s, which produce [grain]',
            icon:[0,1,'agriculture',23,1],
            cost:{'insight':15},
            req:{'sedentism':true},
            effects:[
                {type:'show context',what:['orchard','grain farm']},
            ],
        });

        new G.Unit({
            name:'orchard',
            desc:'@generates [fruit]<>An [orchard] provides [fruit] much faster than a gather can.',
            icon:[1,1,'agriculture'],
            cost:{'fruit':15},
            use:{'worker':2,'land':5,'stone tools':2},
            upkeep:{'coin':0.2},
            effects:[
                {type:'gather',context:'grow',what:{'fruit':15}},
                {type:'mult',value:1.2,req:{'harvest rituals':'on'}}
            ],
            req:{'agriculture':true,'tool-making':true},
            category:'production',
        });

        new G.Unit({
            name:'farm',
            desc:'@generates various plant resources<>[grain,Grain] can be baked into [bread], a stable food source.<>[cotton,Cotton] is a great material for making cotton',
            icon:[0,1,'agriculture'],
            cost:{},
            use:{'land':10},
            upkeep:{'coin':0.5},
            modes:{
                'off':G.MODE_OFF,
                'grain':{name:'Grain farming',icon:[2,1,'agriculture'],desc:'Farm for [grain]',use:{'worker':5,'metal tools':5}},
                'cotton':{name:'Cotton farming',icon:[3,1,'agriculture'],desc:'Farm for [cotton]',use:{'worker':3,'stone tools':3}},
            },
            effects:[
                {type:'gather',context:'grow',what:{'grain':15},mode:'grain'},
                {type:'gather',context:'grow',what:{'cotton':15},mode:'cotton'},
                {type:'mult',value:1.2,req:{'harvest rituals':'on'}}
            ],
            req:{'agriculture':true},
            category:'production',
            gizmos:true,
        });

        new G.Res({
            name:'grain',
            desc:'[grain,Grain] can be ground into flour and baked into [bread].',
            icon:[2,1,'agriculture'],
            turnToByContext:{'decay':{'grain':0.2,'spoiled food':0.8}},
            category:'misc',
        });

        new G.Res({
            name:'cotton',
            desc:'[cotton,Cotton] can be sewn into [basic clothes,clothes].',
            icon:[3,1,'agriculture'],
            turnToByContext:{'decay':{'grain':0.2,'spoiled food':0.8}},
            category:'misc',
        });

        new G.Res({
            name:'fine clothes',
            desc:'Sewn together from [cotton].//Each [population,Person] wearing clothing is slightly happier and healthier.'+clothesInfo,
            icon:[16,7],
            category:'gear',
            tick:function(me,tick)
            {
                var toSpoil=me.amount*0.0005;
                var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
            },
        });

        G.getDict('clothier').modes['weave fine clothes']={name:'Weave fine clothing',desc:'Turn 95 [cotton] into [fine clothes].',req:{'agriculture':true},use:{'metal tools':1}};
        G.getDict('clothier').effects.push({type:'convert',from:{'cotton':95},into:{'fine clothes':1},every:20,mode:'weave fine clothes'});

        var objects={'fine clothes':[0.2,0.2]};
        var leftout=me.amount;
        var prev=leftout;
        var fulfilled=0;
        for (var i in objects)
        {
            fulfilled=Math.min(me.amount,Math.min(G.getRes(i).amount,leftout));
            G.gain('happiness',fulfilled*objects[i][0],'clothing');
            G.gain('health',fulfilled*objects[i][1],'clothing');
            leftout-=fulfilled;
        }
        G.gain('happiness',-leftout*0.15,'no clothing');
        G.gain('health',-leftout*0.15,'no clothing');
	}
});