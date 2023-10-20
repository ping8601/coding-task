from flask import Flask, request, jsonify
from flask_cors import CORS
from rpy2 import robjects
from rpy2.robjects import conversion, default_converter
from reportlab.pdfgen import canvas
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import email_info

app = Flask(__name__)
CORS(app)

# API route to receive form data and trigger R code, PDF generation, and email sending
@app.route('/api/submit', methods=['POST'])
def submit_form():
    data = request.get_json()

    r_output = r_process_data(data['dob'])

    pdf_filename = 'registration_info.pdf'
    create_pdf(pdf_filename, data, r_output)

    # Send the PDF to the user's email
    email_sender = email_info.sender
    email_receiver = data['email']
    email_password = email_info.password
    email_subject = 'Registration Report'
    email_body = "Please find the attached PDF report."

    send_email(email_subject, email_body, email_sender, email_receiver, email_password, pdf_filename)

    return jsonify({'status': 'success', 'message': 'Data received and processed successfully'}), 200

def r_process_data(date_of_birth):
    # R script for age calculation and day of the week determination
    r_script = """
    date_of_birth <- as.Date("%s", format="%%Y-%%m-%%d")
    age <- floor(as.numeric(difftime(Sys.Date(), date_of_birth, units = "days")) / 365.25)
    day_of_week <- weekdays(date_of_birth)
    list(age=age, day_of_week=day_of_week)
    """ % date_of_birth

    with conversion.localconverter(default_converter):
        # Call the R script with the date of birth from the form
        r = robjects.r

        r_output = robjects.r(r_script)

        return r_output

def create_pdf(file_name, data, r_output):
    c = canvas.Canvas(file_name)
    c.drawString(250, 800, "Registration Info")
    c.drawString(100, 750, "Name: {} {}".format(data['firstName'], data['lastName']))
    c.drawString(100, 730, "Age: {}".format(int(r_output[0][0])))
    c.drawString(100, 710, "Day of the Week of Birth: {}".format(r_output[1][0]))
    c.save()

def send_email(subject, body, sender, recipient, password, attachment):
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient

    msg.attach(MIMEText(body, 'plain'))

    with open(attachment, 'rb') as f:
        pdf_attachment = MIMEApplication(f.read(), _subtype="pdf")
        pdf_attachment.add_header('content-disposition', 'attachment', filename=attachment)
        msg.attach(pdf_attachment)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login(sender, password)
       smtp_server.sendmail(sender, recipient, msg.as_string())
    print("Message sent!")

if __name__ == '__main__':
    app.run(debug=True)
