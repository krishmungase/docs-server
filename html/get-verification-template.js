const getVerifcationEmailHTMLTemplate = ({ fullName, verificationLink }) => {
    return (
        `
   <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Account – Codify</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f7f9fc;
                font-family: 'Poppins', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                line-height: 1.6;
                color: #212b36;
            }

            @media only screen and (max-width: 600px) {
                .card-container {
                    width: 100% !important;
                    padding: 30px 25px !important;
                    box-shadow: none !important;
                    border-radius: 0 !important;
                }

                .content-padding {
                    padding: 30px 20px !important;
                }

                h1 {
                    font-size: 24px !important;
                }

                p.description {
                    font-size: 15px !important;
                }

                .button {
                    padding: 12px 25px !important;
                    font-size: 15px !important;
                }
            }
        </style>
    </head>

    <body style="margin: 0; padding: 0; background-color: #f7f9fc; font-family: 'Poppins', sans-serif; line-height: 1.6; color: #212b36;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table class="card-container" width="500" border="0" cellpadding="1" cellspacing="1" style="max-width: 500px; width: 90%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03); border: 1px solid #e9ecef; text-align: center;">
                        <tr>
                            <td align="center" class="content-padding" style="padding: 40px;">
                                <div class="brand-logo" style="font-size: 20px; font-weight: 600; color: #495057; margin-bottom: 30px; display: block; text-align: center;">
                                    <span style="font-size: 1.2em; color: #1A73E8; font-weight: 700;">&lt;/&gt;</span>&nbsp;Codify
                                </div>


                                <h1 style="font-size: 28px; font-weight: 700; color: #212b36; margin: 0 0 15px; padding: 0;">Please verify your email address.</h1>


                                <p class="description" style="font-size: 16px; color: #6c757d; margin: 0 0 30px; padding: 0; line-height: 1.7;">
                                    Hi ${fullName}, your account is almost ready. Verify your email address to complete the setup process.
                                </p>


                                <a href="${verificationLink}" class="button" style="display: inline-block; padding: 14px 30px; font-size: 16px; font-weight: 600; color: #ffffff; background: linear-gradient(to bottom right, #0f172a, #581c87, #0f172a); text-decoration: none; border-radius: 8px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); mso-padding-alt: 0px; text-align: center;">

                                    Verify Now

                                </a>


                                <p class="copyright" style="margin-top: 40px; font-size: 12px; color: #adb5bd; text-align: center; padding: 0;">Copyright (c) 2025 Codify. All right reserved.</p>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>
    </body>
    </html>
  `
    )
}


export default getVerifcationEmailHTMLTemplate