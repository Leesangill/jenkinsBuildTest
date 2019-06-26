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


            obj = new ExcelExportObject("objExport", this);
            this.addChild(obj.name, obj);


            obj = new ExcelImportObject("objImport", this);
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("Button00","481","43","66","31",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("조회");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","10","90",null,null,"10","17",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("Dataset00");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"/></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","724","43","66","31",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("저장");
            this.addChild(obj.name, obj);

            obj = new Button("Button02","643","43","66","31",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("추가");
            this.addChild(obj.name, obj);

            obj = new Button("Button03","562","43","66","31",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("삭제");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("PopupDiv00","89","23","90","58",null,null,null,null,null,null,this);
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button04","10","43","66","31",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("내보내기");
            this.addChild(obj.name, obj);

            obj = new Button("Button05","91","43","66","31",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("가져오기");
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
        this.reqUrl = "http://localhost:8090/nexa17_spring/data/";//Request URL
        this.exUrl = "http://localhost:8090/nexa17_spring/XExportImport.excel";//Request URL
        this.nxUrl = "http://localhost:8090/nexacro17-xeni/";//Request URL

        //조회
        this.Button00_onclick = function(obj,e)
        {
        	this.fn_Search();
        };
        //저장
        this.Button01_onclick = function(obj,e)
        {
        	this.fn_Save();
        };
        //추가
        this.Button02_onclick = function(obj,e)
        {
        	this.Dataset00.addRow();
        };
        //삭제
        this.Button03_onclick = function(obj,e)
        {
        	this.Dataset00.deleteRow(this.Dataset00.rowposition);
        };
        /*******************************************************************************
        	 * Function Name: fn_Search
        	 * Description  : 정보 조회를 위해 호출하는 함수
        	 * Arguments    :
        	 ******************************************************************************/
        	this.fn_Search = function()
        	{
        			var strSvcId = "search"; // Service ID
        			var strScvUrl = this.reqUrl + "search"; // URL
        			var strInDs = ""; //InputDataSet
        			var strOutDs = "Dataset00=OutputDs"; // OutputDataSet
        			var strArg = "" // Argument
        			var strCallBackFunc = "fn_Callback"; // CallBack Function
        			var bAsync = true; //Async
        			this.transaction(strSvcId, strScvUrl, strInDs, strOutDs, strArg, strCallBackFunc, bAsync);
        	}

        /*******************************************************************************
         * Function Name: fn_Save
         * Description  : 학생 정보 변경을 저장하기 위해 호출하는 함수
         * Arguments    :
        ******************************************************************************/
        this.fn_Save = function ()
        {
        	var strSvcId = "save"; // Service ID
        	var strScvUrl =  this.reqUrl + "save"; // URL
        	var strInDs = "InputDs=Dataset00:U"; //InputDataSet
        	var strOutDs = ""; // OutputDataSet
        	var strArg = "" // Argument
        	var strCallBackFunc = "fn_Callback"; // CallBack Function
        	var bAsync = true; //Async
        	this.transaction(strSvcId, strScvUrl, strInDs, strOutDs, strArg, strCallBackFunc, bAsync);
        };

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
        		if(svcID == "search")
        		{
        			this.Grid00.createFormat();
        		}else if(svcID == "save")
        		{
        			alert("저장 완료!");
        			this.fn_Search();
        		}
        		for(var i = 0 ; i< this.Dataset00.rowcount; i++){
        			this.Grid00.setCellProperty("body", i, "edittype", "normal");
        		}
        	}
        };
        //엑셀 export
        this.Button04_onclick = function(obj,e)
        {
        	this.objExport.set_exporturl(this.exUrl);
        	this.objExport.set_exportuitype("none");
        	this.objExport.set_exporttype(nexacro.ExportTypes.EXCEL2007);
        	this.objExport.set_exportfilename("testExcelFile");
        	this.objExport.clearExportItems(nexacro.ExportItemTypes.GRID);
        	this.objExport.addExportItem(nexacro.ExportItemTypes.GRID, this.Grid00, "Sheet1!A1","allband","allrecord");
        	this.objExport.exportData();
        };

        this.objExport_onsuccess = function(obj,e)
        {
        		trace("성공 url ::  " + e.url);
        };

        this.objExport_onerror = function(obj,e)
        {
        	trace("Errormsg ::: " + e.errormsg);
        	trace("ErrorType ::: " + e.errortype);
        	trace("Error statuscode ::: " + e.statuscode);
        };
        //엑셀 import
        this.Button05_onclick = function(obj,e)
        {
        	this.objImport.set_importurl(this.exUrl);
        	this.objImport.set_importtype("nexacro.ImportTypes.EXCEL2007");
        	this.objImport.importData("","Sheet1!A1:K169","Dataset00=output1");
            //trace("rwrw");
        };

        this.objImport_onsuccess = function(obj,e)
        {
        	trace("성공");
        	trace(this.Dataset00.saveXML());
        	this.Grid00.createFormat();
        	for(var i = 0 ; i< this.Dataset00.rowcount; i++){
        			this.Grid00.setCellProperty("body", i, "edittype", "normal");
        		}
        };

        this.objImport_onerror = function(obj,e)
        {
        	trace("Errormsg ::: " + e.errormsg);
        	trace("ErrorType ::: " + e.errortype);
        	trace("Error statuscode ::: " + e.statuscode);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_onclick,this);
            this.Button02.addEventHandler("onclick",this.Button02_onclick,this);
            this.Button03.addEventHandler("onclick",this.Button03_onclick,this);
            this.Button04.addEventHandler("onclick",this.Button04_onclick,this);
            this.Button05.addEventHandler("onclick",this.Button05_onclick,this);
            this.objExport.addEventHandler("onsuccess",this.objExport_onsuccess,this);
            this.objExport.addEventHandler("onerror",this.objExport_onerror,this);
            this.objImport.addEventHandler("onsuccess",this.objImport_onsuccess,this);
            this.objImport.addEventHandler("onerror",this.objImport_onerror,this);
        };

        this.loadIncludeScript("data.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
