package com.tobe.nexa17;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.tobe.nexa17.sampleService.sampleServiceImpl;
import com.tobe.nexa17.sampleVO.sampleVO;

@Controller
public class sampleController {

	@Autowired
	sampleServiceImpl sampleServiceimpl;
	
	@RequestMapping(value="/search", method = RequestMethod.POST)
	public NexacroResult SearchData() throws Exception{
		List<sampleVO> dsList = new ArrayList<sampleVO>();
		List<sampleVO> resultList = sampleServiceimpl.searchData(dsList);
		NexacroResult result = new NexacroResult(); 
		result.addDataSet("OutputDs", resultList);
		return result;
	}
	@RequestMapping(value="/save", method= RequestMethod.POST)
	public NexacroResult SaveData(@ParamDataSet (name="InputDs") List<sampleVO> InputDs) throws Exception{
		sampleServiceimpl.saveData(InputDs);
		NexacroResult result = new NexacroResult();
		return result;
	}

}
