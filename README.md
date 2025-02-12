# Qwizer

The Quiz App allows users to select topics like Computer Science, Entertainment, Sports, History, or opt for a random topic. The app generates 10 multiple-choice questions based on the chosen topic and presents them in a timed format. The quiz includes a countdown timer of 15 seconds for each question, and if the user doesn't answer in time, the app automatically proceeds to the next question.

What sets this quiz app apart from others is its **personalized feedback system**. The app assesses your performance by analyzing both current answers and past responses stored locally, providing feedback on your strongest and weakest topics.

## Features
- **Multiple Topics**: Select from topics like Computer Science, Entertainment, Sports, History, or choose a random topic.
- **Timed Questions**: Each question is timed with a 15-second countdown. If you don't answer in time, the app moves to the next question.
- **Personalized Feedback**: Based on both current and past performance, the app gives feedback on which topics you excel in and which ones need improvement.
- **Score Display**: At the end of the quiz, you receive your total score along with detailed feedback on your strengths and weaknesses.
- **Local Storage**: User responses are saved locally, allowing for personalized tracking and feedback across multiple quiz sessions.

## Technologies Used
- **Frontend**: 
  - **HTML**: Used for structuring the content.
  - **CSS**: Applied for styling the application to create an attractive and responsive design.
  - **JavaScript**: Responsible for the core quiz functionalities like fetching questions, displaying them, managing the countdown, and handling user interactions.
- **API**: Open Trivia Database (OTDB) API is used to fetch questions for the quiz.
- **Local Storage**: Used to save the user’s responses locally for feedback analysis.

## Screenshots

![Screenshot from 2025-02-13 04-00-51](https://github.com/user-attachments/assets/f4542145-7d66-4f81-9bc7-7e17fb928f36)


## Live Application

You can try the live version of the application here: [Live Demo ](https://alikhere.github.io/Qwizer/)


## How to Run the Project

### Prerequisites
- A web browser (Google Chrome, Firefox, etc.)

### Installation Steps
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
