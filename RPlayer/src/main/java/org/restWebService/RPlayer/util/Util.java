package org.restWebService.RPlayer.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Util {
	
	public static Properties getProperties(String fichero) {
        Properties props = new Properties();
        try {
            InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(fichero);
            props.load(is);           
        } catch (IOException ex) {
        	System.err.println("Error importando fichero de propiedades");
        }
        return props;
    }
	
}
