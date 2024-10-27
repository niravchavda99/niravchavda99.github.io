import { EducationProfile, JobProfile } from "./profile";
import MonthYear from "@/src/components/common/month-year";
import incubyteLogo from "@/src/assets/images/incubyte_logo.jpg";
import kskvkuLogo from "@/src/assets/images/kskvku_logo.png";
import gujaratUniversityLogo from "@/src/assets/images/gujarat_university_logo.png";

export const jobs: JobProfile[] = [
  {
    dateEnded: MonthYear.of(0, 0),
    dateStarted: MonthYear.of(7, 2022),
    designation: "Software Craftsperson",
    icon: incubyteLogo.src,
    iconBg: "#5EC5D6",
    location: "Remote",
    organizationName: "Incubyte",
    points: [
      "Focus on writing quality code and deliver well crafted software",
      "Worked on projects in React, Angular, Micronaut, Flutter, Azure, GCP etc.",
    ],
  },
  {
    dateEnded: MonthYear.of(7, 2022),
    dateStarted: MonthYear.of(1, 2022),
    designation: "Software Craftsperson in Training",
    icon: incubyteLogo.src,
    iconBg: "#5EC5D6",
    location: "Remote",
    organizationName: "Incubyte",
    points: [
      "Explored D3.js and worked on project to display different kind of information on graphs",
      "Learnt reactive programming paradigm",
      "Learnt clean coding techniques and practices",
    ],
  },
];

export const educations: EducationProfile[] = [
  {
    dateEnded: MonthYear.of(6, 2022),
    dateStarted: MonthYear.of(8, 2019),
    degree: "MCA - Masters in Computer Application",
    icon: gujaratUniversityLogo.src,
    iconBg: "#EC1B94",
    instituteName: "Department of Computer Science, Gujarat University",
    location: "Ahmedabad, Gujarat",
    points: [
      "Learnt C, C++, Java, MySQL, Cloud Computing with AWS, Networking, Distributed Application Development with JSP and problem solving",
      "Participated in Bootathon Knockdown The Lockdown organized by IIT Bombay",
      "Developed VirtualLabs with IIT Bombay",
      "Developed curriculum projects in group",
    ],
  },
  {
    dateEnded: MonthYear.of(6, 2019),
    dateStarted: MonthYear.of(7, 2016),
    degree: "BCA - Bachelors in Computer Application",
    icon: kskvkuLogo.src,
    iconBg: "#79C5F1",
    instituteName: "Krantiguru Shyamji Krishna Verma Kachchh University",
    location: "Kachchh, Gujarat",
    points: [],
  },
];
