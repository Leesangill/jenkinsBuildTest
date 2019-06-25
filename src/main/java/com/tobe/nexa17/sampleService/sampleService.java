package com.tobe.nexa17.sampleService;
import java.util.List;

import com.tobe.nexa17.sampleVO.sampleVO;

public interface sampleService {
	public List<sampleVO> searchData(List<sampleVO> dsList) throws Exception;
	public void saveData(List<sampleVO> InputDs) throws Exception;
}
