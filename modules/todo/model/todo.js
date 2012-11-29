
shape.registerModel("todo",{
        meta:{
            persitence:"none"
        },
        ctor:function(){
          this.current = this.all;
        },
        all:{
            type:"collection",
            contains:"task"
        },
        active:{
            type:"collection",
            contains:"task"
        },
        completed:{
            type:"collection",
            contains:"task"
        },
        current:{
            type:"collection",
            value:"null"
        },
        newTitle:{
            type:"string"
        },
        recentTask:{
            type:"task",
            value:"null"
        },
        pluralizer:{
            chains:"todoCount",
            code:function(){
                if(this.todoCount == 1){
                    return "";
                } else {
                    return "(s)";
                }
            }
        },
        todoCount:{
            chains:"active",
            code:function(){
                return this.active.length;
            }
        },
        completedCount:{
            chains:"completed",
            code:function(){
                return this.completed.length;
            }
        },
        toggle:function(model){
            if(model.completed == true){
                this.active.remove(model);
                this.completed.push(model);
            } else{
                this.completed.remove(model);
                this.active.push(model);
            }
        },
        remove:function(model){
            this.all.remove(model);
            this.active.remove(model);
            this.completed.remove(model);
        },
        removeAllCompleted:function(model){
            this.completed.removeAll();
            this.all.copy(this.active);
        },
        query:{
            lang:"sql",
            params:"personId",
            typeName:"Person",
            value:"select * from Tasks p where p.id={personId}"
        }
    }
);


