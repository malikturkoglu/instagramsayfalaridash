import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);


// turkishmanufactory
/*

<div style="margin-top:20px; margin-bottom:20px;" class="g-cols vc_row via_grid cols_2 laptops-cols_inherit tablets-cols_inherit mobiles-cols_1 valign_top type_default stacking_default">
 <div class="wpb_column vc_column_container">
[text* company-name autocomplete:name placeholder "Company Name"]
 </div>
 <div class="wpb_column vc_column_container">
 [text* your-name autocomplete:name placeholder "Your Name"] 
</div></div>
[textarea* text autocomplete:name placeholder "Tell suppliers what you need"] 
[multilinefile file "File Upload Assets"]
<div style="margin-top:20px; margin-bottom:20px;" class="g-cols vc_row via_grid cols_3 laptops-cols_inherit tablets-cols_inherit mobiles-cols_1 valign_top type_default stacking_default">
 <div class="wpb_column vc_column_container">
[text* country autocomplete:name placeholder "Country"]
</div>
 <div class="wpb_column vc_column_container">
[email* your-mail autocomplete:name placeholder "Email Address"]</div>
 <div class="wpb_column vc_column_container">
[text* your-phone autocomplete:name placeholder "Telephone Number"] 
</div>
</div> 
<div style="margin-top:20px; margin-bottom:20px;" class="g-cols vc_row via_grid cols_2 laptops-cols_inherit tablets-cols_inherit mobiles-cols_1 valign_top type_default stacking_default">
<div class="wpb_column vc_column_container">
<br/>

<label><b>Buying Type</b></label>
[checkbox buyingtype use_label_element "One-Time" "Frequently"]
</div>
<div class="wpb_column vc_column_container">
<b>Do you have agency for cargo Company Turkey ?</b>
[checkbox cargo use_label_element "Yes" "No"]
</div>
</div>
[submit "Send"]

*/


/*

Company Name: [company-name]
Your Name: [your-name]
EProduct you want to boy: [wanttoboy]
Country: [country]
File: [file]
Your Phone: [your-phone]
Your Email: [your-mail]
Text: [text]
Buying Type: [buyingtype]
Do you have agency for cargo Company Turkey: [cargo]

-- 
This e-mail was sent from a contact form on [_site_title] ([_site_url])

*/
