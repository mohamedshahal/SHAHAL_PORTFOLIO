import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER

def create_resume_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=50,
        rightMargin=50,
        topMargin=45,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()

    # Custom styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#111111'),
        spaceAfter=2
    )

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#222222'),
        spaceAfter=8
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#333333'),
        spaceAfter=12
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#111111'),
        spaceBefore=10,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#222222')
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#222222'),
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=2.5
    )

    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#111111')
    )

    job_company_style = ParagraphStyle(
        'JobCompany',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#444444')
    )

    date_loc_style = ParagraphStyle(
        'DateLoc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#333333')
    )

    story = []

    # 1. Header
    story.append(Paragraph("<b>MOHAMED SHAHAL KM</b>", name_style))
    story.append(Paragraph("Videographer & Editor", title_style))
    
    contact_text = (
        "mohamedshahalkm@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; +91 81292 12796 &nbsp;&nbsp;|&nbsp;&nbsp; Malappuram, Kerala<br/>"
        "linkedin.com/in/mohamed-shahal-190a0b365 &nbsp;&nbsp;|&nbsp;&nbsp; instagram.com/eyesofshahl<br/>"
        "mohamedshahal.github.io/SHAHAL_PORTFOLIO"
    )
    story.append(Paragraph(contact_text, contact_style))

    # Helper for section headings with underline
    def add_section_header(title):
        story.append(Paragraph(f"<b>{title}</b>", section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#111111'), spaceBefore=2, spaceAfter=8))

    # 2. Summary
    add_section_header("Summary")
    summary_text = (
        "Creative and detail-oriented Videographer & Video Editor with hands-on experience in creating engaging "
        "social media, promotional, and project-based video content. Skilled in camera handling, shoot planning, "
        "lighting, camera angles, video editing, basic color grading, and sound editing. Proficient in Premiere Pro, "
        "CapCut, and DaVinci Resolve, with experience managing multiple projects and delivering high-quality content "
        "within deadlines."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 8))

    # 3. Professional Experience
    add_section_header("Professional Experience")

    # Job 1
    t1_left = Paragraph("<b>Freelance Videographer</b>, <i>Optax Wave Solutions Pvt. Ltd</i>", job_title_style)
    t1_right = Paragraph("2026 – Present<br/>Malappuram, Kerala", date_loc_style)
    t1 = Table([[t1_left, t1_right]], colWidths=[350, 162])
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t1)
    
    bullets_job1 = [
        "• Planned, shot, and edited videos for clients and social media platforms",
        "• Handled camera operation, lighting, audio recording, and video production",
        "• Created promotional videos, reels, product videos, and event content",
        "• Edited videos using professional editing software and applied color grading and audio enhancement",
        "• Managed projects from pre-production to final delivery",
        "• Edited videos using Premiere Pro, DaVinci, and CapCut, incorporating transitions, effects, and color correction for polished output"
    ]
    for b in bullets_job1:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 6))

    # Job 2
    t2_left = Paragraph("<b>Videographer & Editor</b>, <i>Ziwerd Advertisements</i>", job_title_style)
    t2_right = Paragraph("2025 – 2026<br/>Malappuram, Kerala", date_loc_style)
    t2 = Table([[t2_left, t2_right]], colWidths=[350, 162])
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t2)

    bullets_job2 = [
        "• Shot and edited videos for clients and social media",
        "• Delivered high-quality content on time",
        "• Assisted in planning shoots, including location setup, lighting, and camera angles",
        "• Managed multiple projects and met tight deadlines in a fast-paced advertising environment",
        "• Edited promotional and social media videos based on client requirements",
        "• Added transitions, text, music, sound effects, and visual effects to enhance video quality"
    ]
    for b in bullets_job2:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 6))

    # Job 3
    t3_left = Paragraph("<b>Videographer & Editor</b>, <i>Brickzone</i>", job_title_style)
    t3_right = Paragraph("2024 – 2025<br/>Malappuram, Kerala", date_loc_style)
    t3 = Table([[t3_left, t3_right]], colWidths=[350, 162])
    t3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t3)

    bullets_job3 = [
        "• Captured on-site construction progress, including groundwork, structural work, and finishing stages",
        "• Ensured safe handling of equipment while shooting in active construction environments",
        "• Edited videos with clear storytelling to present before/after comparisons and project updates",
        "• Handled video shooting with focus on product presentation and visual quality"
    ]
    for b in bullets_job3:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 8))

    # 4. Education (Part on page 1)
    add_section_header("Education")
    edu1_left = Paragraph("<b>Bachelor of Commerce Four-Year (BCOMF)</b>, <i>Indira Gandhi National Open University</i>", job_title_style)
    edu1_right = Paragraph("Present<br/>Malappuram, Kerala", date_loc_style)
    t_edu1 = Table([[edu1_left, edu1_right]], colWidths=[350, 162])
    t_edu1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu1)

    # PAGE BREAK FOR PAGE 2
    story.append(PageBreak())

    # Education (Part on page 2)
    edu2_left = Paragraph("<b>Diploma In Computer Engineering</b>, <i>Majlis Polytechnic College, Valanchery</i>", job_title_style)
    edu2_right = Paragraph("2022 – 2025<br/>Malappuram, Kerala", date_loc_style)
    t_edu2 = Table([[edu2_left, edu2_right]], colWidths=[350, 162])
    t_edu2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu2)
    story.append(Spacer(1, 10))

    # 5. Skills
    add_section_header("Skills")

    skills_col1 = [
        "• Videography",
        "• Cinematography",
        "• Lighting Techniques",
        "• Event Videography",
        "• Gimbal Operation",
        "• DaVinci",
        "• Adobe Premiere Pro",
        "• Visual Effects",
        "• Short-Form Video Editing",
        "• Mobile Videography & Video Editing"
    ]

    skills_col2 = [
        "• Camera Operation",
        "• Video Production",
        "• Audio Recording",
        "• Product Videography",
        "• Video Editing",
        "• CapCut",
        "• Color Grading",
        "• Audio Editing",
        "• Reels & Social Media Content",
        "• Strong Communication Skills"
    ]

    skill_rows = []
    for s1, s2 in zip(skills_col1, skills_col2):
        p1 = Paragraph(s1, bullet_style)
        p2 = Paragraph(s2, bullet_style)
        skill_rows.append([p1, p2])

    skill_table = Table(skill_rows, colWidths=[256, 256])
    skill_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(skill_table)
    story.append(Spacer(1, 14))

    # 6. Languages
    add_section_header("Languages")

    lang_row1 = [
        Paragraph("• English", bullet_style),
        Paragraph("• Malayalam", bullet_style),
        Paragraph("• Hindi", bullet_style)
    ]
    lang_row2 = [
        Paragraph("• Tamil", bullet_style),
        Paragraph("", bullet_style),
        Paragraph("", bullet_style)
    ]
    lang_table = Table([lang_row1, lang_row2], colWidths=[170, 170, 172])
    lang_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(lang_table)

    doc.build(story)
    print(f"Resume generated successfully: {filename}")

if __name__ == '__main__':
    output_path = os.path.join(os.path.dirname(__file__), 'assets', 'Mohamed_Shahal_KM_Resume.pdf')
    create_resume_pdf(output_path)
