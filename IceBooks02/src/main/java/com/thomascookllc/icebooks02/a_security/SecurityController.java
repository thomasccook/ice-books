package com.thomascookllc.icebooks02.a_security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SecurityController {

	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login(ModelMap model) {
		return "a_security/login";
	}
	
	@RequestMapping(value="/loginFailed", method=RequestMethod.GET)
	public String loginFailed(ModelMap model) {		
		model.addAttribute("error", "true");
		return "a_security/loginFailed";
	}
	
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public String logout(ModelMap model) {
		return "a_security/logout";
	}
	
	@RequestMapping(value="/403", method=RequestMethod.GET)
	public String error403(ModelMap model) {
		return "a_security/403";
	}

	/*
	@RequestMapping(value="/db/changePassword", method=RequestMethod.GET)
	public String changePassword(ModelMap model) {
		model.put("username", SecurityContextHolder.getContext().getAuthentication().getName());	
		return "a_security/changePassword";
	}	
	*/
	
}
