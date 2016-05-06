/* SMS-me-the-App */


(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setIdentity track validateCode".split(" "), 0);
branch.init('key_live_ljjPJCVGB1FEX4WZQPsN0fllyqoBapxH');

var invite_id = $("#submit").data("id");
var sms_text = $("#submit").data("msg");
	console.log(sms_text);

function sendSMS(phone) {
	branch.sendSMS(
		phone,
    {
    	campaign: "external_invite",
        feature: 'invite',
        data: {
            type: "invite",
            uuid: invite_id,
            '$custom_sms_text': sms_text
          }
    },
		{ make_new_link: true },
		function(err) { console.log(err); });

};

$("#phone").intlTelInput( {
	initialCountry: "auto",
	geoIpLookup: function(callback) {
		$.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
			var countryCode = (resp && resp.country) ? resp.country : "";
			callback(countryCode);
		});
	},
	preferredCountries: ["mx", "us"],
	utilsScript: "js/utils.js"
});

$("#submit").bind('click', function () {
	var telInput = $("#phone");
	if (telInput.intlTelInput("isValidNumber")) {
		var intlNumber = telInput.intlTelInput("getNumber");
		sendSMS(intlNumber);
	} else {
		alert("Nel");
	};
});