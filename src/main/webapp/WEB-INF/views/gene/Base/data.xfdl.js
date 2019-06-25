(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("data");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("Dataset00", this);
            obj._setContents("");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("Button00","660","30","128","31",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("조회");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","10","90","780","493",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("Dataset00");
            obj._setContents("<Formats><Format id=\"default\"/></Formats>");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,600,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("data.xfdl", function() {

        this.Button00_onclick = function(obj,e)
        {
        	this.fn_Search("search");
        };


        /*******************************************************************************
        	 * Function Name: fn_Search
        	 * Description  : 정보 조회를 위해 호출하는 함수
        	 * Arguments    :
        	 ******************************************************************************/
        	this.fn_Search = function()
        	{
        			var strSvcId = "search"; // Service ID
        			var strScvUrl = "http://localhost:8090/nexa17_spring/search"; // URL
        			var strInDs = ""; //InputDataSet
        			var strOutDs = "Dataset00=output00"; // OutputDataSet
        			var strArg = "" // Argument
        			var strCallBackFunc = "fn_Callback"; // CallBack Function
        			var bAsync = true; //Async
        			this.transaction(strSvcId, strScvUrl, strInDs, strOutDs, strArg, strCallBackFunc, bAsync);
        	}

        /*******************************************************************************
         * Function Name: fn_Callback
         * Description  : Transacion 통신 후 CallBack 함수
         * Arguments    : svcID : Service ID, errorCode : 에러코드, errorMsg : 에러메세지
         * Return       :
         ******************************************************************************/
        this.fn_Callback = function(svcID, errorCode, errorMsg)
        {
        	if(errorCode < 0)
        	{
        		trace("errMsg :::" + errorMsg);
        		return false;
        	}else{
        		this.Grid00.createFormat();
        		trace(this.Dataset00.saveXML());
        	}
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
        };

        this.loadIncludeScript("data.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
