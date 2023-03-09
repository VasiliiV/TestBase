import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
public class InputController {

    @PostMapping("/input")
    public void processInput(@RequestParam("yandex") String yandexValue, @RequestParam("google") String googleValue) {
        // handle input data here
    }
}