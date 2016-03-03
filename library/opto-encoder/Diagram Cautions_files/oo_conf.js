/*
OnlineOpinion v5.9.0
Released: 11/17/2014. Compiled 11/17/2014 01:01:01 PM -0600
Branch: master 7cffc7b9a0b11594d56b71ca0cb042d9b0fc24f5
Components: Full
UMD: disabled
The following code is Copyright 1998-2014 Opinionlab, Inc. All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com
*/

/* global window, OOo */

/*
Inline configuration
*********************
Object is now being instantiated against the OOo object (1 global class)
To call this object, place the below in the click event
OOo.oo_feedback.show(event)
*/
(function (w, o) {
    'use strict';

    var rp  = '://usa.canon.com';

    if (window.location.href.search(/cusa\/consumer|cusa\/professional|cusa\/broadcast/i) != -1) {
        rp = '://consumer.www.canon.com';
    }

        var OpinionLabInit = function () {

            o.oo_feedback = new o.Ocode({
                referrerRewrite: {
                    searchPattern: /:\/\/[^\/]*/,
                    replacePattern: rp
                }
            });

        };

        o.addEventListener(w, 'load', OpinionLabInit, false);

})(window, OOo);

(function (w, o) {
    'use strict';

    
    var rp  = '://search.www.canon.com';

        var OpinionLabSearchInit = function () {

            o.oo_searchfeedback = new o.Ocode({
                referrerRewrite: {
                    searchPattern: /:\/\/[^\/]*/,
                    replacePattern: rp
                }
            });

        };

        o.addEventListener(w, 'load', OpinionLabSearchInit, false);

})(window, OOo);


