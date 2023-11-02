import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    height: '80vh',
    overflow: 'auto',
    borderRadius: 10
};

export default function TermsConditionModel() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleOpen} >Terms and Conditions</Link></label>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div style={{width:'100%', textAlign:'right'}}>
                        <button 
                        onClick={()=>handleClose()}
                        style={{fontSize:30,padding:5}}>❌</button>
                    </div>

                    <div className='p-2'>
                        <h3>Terms and Conditions for Nakshtra Ventures Pvt Ltd </h3>

                        <h5 className="pt-3">Introduction</h5>

                        <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, ebhuktan accessible at ebhuktan.com.</p>

                        <p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions. These Terms and Conditions have been generated with the help of the <a href="https://www.termsandcondiitionssample.com">Terms And Conditiions Sample Generator</a>.</p>

                        <p>Minors or people below 18 years old are not allowed to use this Website.</p>

                        <h5 className="pt-3">Intellectual Property Rights</h5>

                        <p>Other than the content you own, under these Terms, Nakshtra Ventures Pvt Ltd  and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>

                        <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>

                        <h5 className="pt-3">Restrictions</h5>

                        <p>You are specifically restricted from all of the following:</p>

                        <ul>
                            <li>publishing any Website material in any other media;</li>
                            <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                            <li>publicly performing and/or showing any Website material;</li>
                            <li>using this Website in any way that is or may be damaging to this Website;</li>
                            <li>using this Website in any way that impacts user access to this Website;</li>
                            <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                            <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                            <li>using this Website to engage in any advertising or marketing.</li>
                        </ul>

                        <p>Certain areas of this Website are restricted from being access by you and Nakshtra Ventures Pvt Ltd  may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>

                        <h5 className="pt-3">Your Content</h5>

                        <p>In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Nakshtra Ventures Pvt Ltd  a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>

                        <p>Your Content must be your own and must not be invading any third-party's rights. Nakshtra Ventures Pvt Ltd  reserves the right to remove any of Your Content from this Website at any time without notice.</p>

                        <h5 className="pt-3">No warranties</h5>

                        <p>This Website is provided "as is," with all faults, and Nakshtra Ventures Pvt Ltd  express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>

                        <h5 className="pt-3">Limitation of liability</h5>

                        <p>In no event shall Nakshtra Ventures Pvt Ltd , nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Nakshtra Ventures Pvt Ltd , including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

                        <h5 className="pt-3">Indemnification</h5>

                        <p>You hereby indemnify to the fullest extent Nakshtra Ventures Pvt Ltd  from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>

                        <h5 className="pt-3">Severability</h5>

                        <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>

                        <h5 className="pt-3">Variation of Terms</h5>

                        <p>Nakshtra Ventures Pvt Ltd  is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>

                        <h5 className="pt-3">Assignment</h5>

                        <p>The Nakshtra Ventures Pvt Ltd  is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>

                        <h5 className="pt-3">Entire Agreement</h5>

                        <p>These Terms constitute the entire agreement between Nakshtra Ventures Pvt Ltd  and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>

                        <h5 className="pt-3">Governing Law & Jurisdiction</h5>

                        <p>These Terms will be governed by and interpreted in accordance with the laws of the State of in, and you submit to the non-exclusive jurisdiction of the state and federal courts located in in for the resolution of any disputes.</p>  s
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

