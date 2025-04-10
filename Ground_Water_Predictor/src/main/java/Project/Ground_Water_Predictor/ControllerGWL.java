package Project.Ground_Water_Predictor;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ControllerGWL {
	
	private PredictionService predictionService;

	public ControllerGWL(PredictionService predictionService) {
		super();
		this.predictionService = predictionService;
	}
	
	@PostMapping("/gwl")
	public String predictGWl(@RequestBody GWL_Features features) throws IOException , InterruptedException{
		return predictionService.predictGWL(features);
	}
}
