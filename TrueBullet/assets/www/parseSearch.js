( 
   function($)
   {
    $.fn.parseSearchJson=function(furl)
    {
            
                 $.ajax({
                     type:"GET",
                     dataType:"json",
                     url:furl,
                     async:false,
                     success:function(json)
                     {
                         var printHTML="";
                         var indexId=0;
                         if(json["searchInformation"]["totalResults"]==0)
                         {
                             printHTML="<br/><p><h3>No results found</h3></p>";
                         }
                         else
                         {
                             
                              $.each(json["items"],function(index,entryobject)
                                  {
                                     var img="";
                                     var width,height,src;
                                     if(typeof entryobject.pagemap=='undefined')
                                     {
                                         img="";
                                         
                                     }
                                     else
                                     {
                                         
                                         if(typeof entryobject.pagemap.cse_thumbnail=='undefined')
                                         {
                                             img="";
                                         }
                                         else
                                         {
                                             imgobject=entryobject.pagemap.cse_thumbnail;
                                             $.each(imgobject,function(i,ob)
                                             {
                                                  width=ob.width;
                                                  height=ob.height;
                                                  src=ob.src;    
                                             });
                                             
                                             img="<br/><img src='"+src+"' width='"+width+"px' height='"+height+"px' />";
                                             console.log(img);
                                             
                                         }
                                     }
                                     
                                     printHTML=printHTML+"<br/><a href='"+entryobject["link"]+"' id='"+indexId+"'><h3>"+entryobject["htmlTitle"]+"</h3>"+img+"</a><p>"+entryobject["htmlSnippet"]+"</p><h4>"+entryobject["htmlFormattedUrl"]+"</h4><br/>";                             
                                     $("#"+indexId).bind("click",function()
                                     {
                                         $("#result").load(entryobject["link"]);
                                     })
                                     indexId++;
                                     console.log(printHTML);
                                  
                                  });
                                  
                         }
                         $("#result").html(printHTML);
                         
                     },
                  
                         
                         
                 });
                 
                 
    }
   }  
)(jQuery);