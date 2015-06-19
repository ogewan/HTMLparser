/*! HTMLparser (c) 2015 Oluwaseun Ogedengbe, MIT seun40.github.io/comic-ng/, incognito*/
var HTML2Obj = function(o){
        //console.log("coproducer");
    var m = function(a){
        //console.log("HTMLobj Clean called, with",a);
        for(i=0;i<a.length;i++){
            if(a[i].$head[0]=="/"){
                /*console.log(a.splice(i,1));*/
                a.splice(i,1);
            }
            if(i>=a.length) break;
        }
        for(i=0;i<a.length;i++){
            if(a[i].$in.length) m(a[i].$in);
            //console.log(a.length);
            
        }
        return a;
    };
    var n = function(a){
        //console.log("HTMLobj Parse called, with");
        if(void 0===a){
            console.error("HTMLparser needs something to parse");
            return -1;
        } else if(typeof a==='string'){/*if a is string turn it into a cleaned array of tags*/
            a = a.replace(/[\n\r\t<]/g, '').split(">");
            var w = 0;
            for (u = 0; u < a.length; u++) {
                w = 0;
                for (v = 0; v < a[u].length; v++) {
                    //console.log("'",a[u][v],"'");
                    if(a[u][v]!=' ') break;
                    w++;
                }
                a[u] = a[u].substring(w,a[u].length);
                //console.log(a[u]);
            }
            a.pop();
        }
        //console.log(a);
        if(a.length<1) return [];
        var taglist = [];
        var tag = {};
        var b = [];
        var c = [];
        var iter = [];
        var u = 0;
        var w = 0;
        var v = 0;
        var x = 0;
        var y = 1;
        var i = 0;
        while(a.length>0){ 
            w = 0;
            x = 0;
            u = 0;
            b = [];
            tag = {$head:'',$tail:'',$in:[],innerHTML:""};
            for(q=0;q<a.length;q++){
                b.push(a[q].split(" ")[0]);/*reduce to tags for searching*/
            }
            /*console.log(a);
        console.log(b);*/
            i = -1;
            while(u>=0){
                u = b.indexOf(b[0],u+1);
                i++;/*how many nested replicas there are*/
            }
            for(j=-1;j < i;j++){ 
                /*console.log("active");*/
                x = b.indexOf("/"+b[0],x);
                w = b.indexOf("/"+b[0],x+1);
                if(w<0){
                    if(j >= i){//if we break before we've reached the closing tag, the tag doesn't exist*/
                        while(i>0){
                            a.push("/"+b[0]);/*thus we append the closing tags*/
                            b.push("/"+b[0]);
                            i--;
                        }
                    }
                    break;
                }
            }
            /*console.log("0",x);*/
            iter = a[0].split(" ");
            tag.$head = b[0];
            tag.$tail = b[x];
            for (k = 1; k < iter.length; k++) {
                var sub_iter = iter[k].split("=");
                tag[sub_iter[0]] = (sub_iter.length>1)?sub_iter[1]:'';
            }
            /*console.log(a);*/
            c = a.splice(0,x);
            //c.splice(c.length-1,1);
            //console.log(c);
            c.splice(0,1);
            if(x<=1) a.splice(0,1);
            //console.log(c);
            tag.$in = n(c);
            taglist.push(tag);
            //console.log(a);

            //if(x<0) break;
        }    
        return taglist;
    };
    return m(n(o));
};
var Obj2HTML = function(b,e){
    var a = function(b,e){
        if(void 0===b){
            return -1;
        }
        var c;
        for (i = 0; i < b.length; i++) { 
            c = document.createElement(b[i].$head);
            for (var key in b[i]){
                if(b[i].hasOwnProperty(key) && key[0]!='$'){
                    c.setAttribute(key, b[i][key]);
                }
            }
            //console.log(a);
            //console.log(b[i].$head);
            if(b[i].$in.length) a(b[i].$in, c);
            if(e && !(void 0 === e)) e.appendChild(c);
        }
        return c;
    };
    return a(b,e);
}