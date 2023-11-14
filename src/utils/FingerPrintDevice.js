import $ from 'jquery';

const FingerPrintDevice = () => {
    let url, finalUrl, MethodCapture, MethodInfo, OldPort, DString, device, thrownError

    let MyData;
    function discoverAvdm() {
        var GetCustomDomName = "127.0.0.1";
        var SuccessFlag = 0;
        var primaryUrl = "http://" + GetCustomDomName + ":";

        try {
            var protocol = window.location.href;
            if (protocol.indexOf("https") >= 0) {
                primaryUrl = "https://" + GetCustomDomName + ":";
            }
        } catch (e) { }

        url = "";

        SuccessFlag = 0;
        for (var i = 11100; i <= 11112; i++) {
            console.log("Discovering RD service on port : " + i.toString());
            var verb = "RDSERVICE";
            var err = "";

            var res;
            $.support.cors = true;
            var httpStaus = false;
            var jsonstr = "";
            var data = new Object();
            var obj = new Object();

            $.ajax({
                type: "RDSERVICE",
                async: false,
                crossDomain: true,
                url: primaryUrl + i.toString(),
                contentType: "text/xml; charset=utf-8",
                processData: false,
                cache: false,
                crossDomain: true,

                success: function (data) {
                    httpStaus = true;
                    res = {
                        httpStaus: httpStaus,
                        data: data
                    };
                    //alert(data);
                    $("#txtDeviceInfo").val(data);
                    finalUrl = primaryUrl + i.toString();
                    var $doc = $.parseXML(data);//$data
                    // debugger;
                    var CmbData1 = $($doc).find('RDService').attr('status');
                    var CmbData2 = $($doc).find('RDService').attr('info');

                    if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'Morpho_RD_Service' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'SecuGen India Registered device Level 0' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'Precision - Biometric Device is ready for capture' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'RD service for Startek FM220 provided by Access Computech' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'NEXT' + '\\b').test(CmbData2) == true) {

                        // debugger;
                        console.log($($doc).find('Interface').eq(0).attr('path'));

                        if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true) {

                            if ($($doc).find('Interface').eq(0).attr('path') == "/rd/capture") {
                                MethodCapture = $($doc).find('Interface').eq(0).attr('path');
                            }
                            if ($($doc).find('Interface').eq(1).attr('path') == "/rd/capture") {
                                MethodCapture = $($doc).find('Interface').eq(1).attr('path');
                            }
                            if ($($doc).find('Interface').eq(0).attr('path') == "/rd/info") {
                                MethodInfo = $($doc).find('Interface').eq(0).attr('path');
                            }
                            if ($($doc).find('Interface').eq(1).attr('path') == "/rd/info") {
                                MethodInfo = $($doc).find('Interface').eq(1).attr('path');
                            }
                        } else if (RegExp('\\b' + 'Morpho_RD_Service' + '\\b').test(CmbData2) == true) {
                            MethodCapture = $($doc).find('Interface').eq(0).attr('path');
                            MethodInfo = $($doc).find('Interface').eq(1).attr('path');
                        } else if (RegExp('\\b' + 'SecuGen India Registered device Level 0' + '\\b').test(CmbData2) == true) {
                            MethodCapture = $($doc).find('Interface').eq(0).attr('path');
                            MethodInfo = $($doc).find('Interface').eq(1).attr('path');
                        } else if (RegExp('\\b' + 'Precision - Biometric Device is ready for capture' + '\\b').test(CmbData2) == true) {
                            MethodCapture = $($doc).find('Interface').eq(0).attr('path');
                            MethodInfo = $($doc).find('Interface').eq(1).attr('path');
                        } else if (RegExp('\\b' + 'RD service for Startek FM220 provided by Access Computech' + '\\b').test(CmbData2) == true) {
                            MethodCapture = $($doc).find('Interface').eq(0).attr('path');
                            MethodInfo = $($doc).find('Interface').eq(1).attr('path');
                        } else if (RegExp('\\b' + 'NEXT' + '\\b').test(CmbData2) == true) {
                            MethodCapture = $($doc).find('Interface').eq(0).attr('path');
                            MethodInfo = $($doc).find('Interface').eq(1).attr('path');
                        }

                        if (CmbData1 == 'READY') {

                            $('#method').val(finalUrl + MethodCapture);
                            $('#info').val(finalUrl + MethodInfo);

                            SuccessFlag = 1;

                            alert("Device detected successfully");
                            CaptureAvdm()
                            return false;
                        }
                        else if (CmbData1 == 'USED') {
                            $('#method').val(finalUrl + MethodCapture);
                            $('#info').val(finalUrl + MethodInfo);

                            SuccessFlag = 1;

                            alert("Device detected successfully");
                            CaptureAvdm()
                            return false;
                        }


                        else if (CmbData1 == 'NOTREADY') {
                            alert("Device Not Discover");
                            return false;
                        }
                    }

                },
                error: function (jqXHR, ajaxOptions, thrownError) {
                    if (i == "8005" && OldPort == true) {
                        OldPort = false;
                        i = "11099";
                    }
                },

            });

            if (SuccessFlag == 1) {
                break;
            }
        }

        if (SuccessFlag == 0) {
            alert("Connection failed Please try again.");
        } else {
            //alert("RDSERVICE Discover Successfully");
        }
        $("select#ddlAVDM").prop('selectedIndex', 0);
        return res;
    };

    function CaptureAvdm() {
        DString = '';
        device = "mantra";

        var strWadh = "";
        var strOtp = "";


        var XML = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="P" /> ' + DString + '<CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';


        var finUrl = $('#method').val();


        var verb = "CAPTURE";


        var err = "";

        var res;
        $.support.cors = true;
        var httpStaus = false;
        var jsonstr = "";

        $.ajax({

            type: "CAPTURE",
            async: false,
            crossDomain: true,
            url: finUrl,
            data: XML,
            contentType: "text/xml; charset=utf-8",
            processData: false,
            success: function (data) {

                if (device == "morpho") {
                    var xmlString = (new XMLSerializer()).serializeToString(data);  //morpho
                } else if (device == "mantra") {
                    var xmlString = data;  //mantra
                } else if (device == "secugen") {
                    var xmlString = (new XMLSerializer()).serializeToString(data);  //secugen
                } else if (device == "precision") {
                    var xmlString = (new XMLSerializer()).serializeToString(data);  //precision
                } else if (device == "startek") {
                    var xmlString = (new XMLSerializer()).serializeToString(data);  //startek
                } else if (device == "nextrd") {
                    var xmlString = (new XMLSerializer()).serializeToString(data);  //next rd
                }
                httpStaus = true;
                res = { httpStaus: httpStaus, data: xmlString };


                // setFingerData(xmlString)
                MyData = xmlString
                $('#txtPidData').val(xmlString);

                var $doc = data;
                var Message = $($doc).find('Resp').attr('errInfo');
                var errorcode = $($doc).find('Resp').attr('errCode');
                if (errorcode == 0) {

                    var $doc = $.parseXML(data);
                    var Message = $($doc).find('Resp').attr('errInfo');

                    alert(Message);

                } else {
                    $('#loaderbala').css("display", "none");
                    alert('Capture Failed');
                    window.location.reload();
                }

            },
            error: function (jqXHR, ajaxOptions, thrownError) {
                //$('#txtPidOptions').val(XML);
                alert(thrownError);
                res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
            },
        });

        return res;
    }

    function getHttpError(jqXHR) {
        var err = "Unhandled Exception";
        if (jqXHR.status === 0) {
            err = 'Service Unavailable';
        } else if (jqXHR.status == 404) {
            err = 'Requested page not found';
        } else if (jqXHR.status == 500) {
            err = 'Internal Server Error';
        } else if (thrownError === 'parsererror') {
            err = 'Requested JSON parse failed';
        } else if (thrownError === 'timeout') {
            err = 'Time out error';
        } else if (thrownError === 'abort') {
            err = 'Ajax request aborted';
        } else {
            err = 'Unhandled Error';
        }
        return err;
    }
    discoverAvdm()
    return MyData
}

export default FingerPrintDevice