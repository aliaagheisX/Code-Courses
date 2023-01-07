-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2023 at 05:34 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codecourses`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `activitesReport` ()   BEGIN
    SELECT 
    (SELECT COUNT(*) FROM course) as number_of_courses,
    (SELECT COUNT(*) FROM article) as number_of_article,
    (SELECT COUNT(*) FROM quiz) as number_of_quiz,
    (SELECT COUNT(*) FROM lesson) as number_of_lessons,
    (SELECT COUNT(*) FROM question) as number_of_question,
    (SELECT COUNT(*) FROM _comment) as number_of_comments,
    (SELECT COUNT(*) FROM messages) as number_of_messages;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_article` (IN `title` VARCHAR(50), IN `description` VARCHAR(800), IN `image` VARCHAR(400), IN `body` VARCHAR(5000000), IN `i_id` INT(10), OUT `article_id` INT(10))   BEGIN    
    INSERT INTO ELEMENT(TITLE,DESCRIPTION,IMAGE) VALUES (title, description, image);
    SET article_id = LAST_INSERT_ID();
    INSERT INTO ARTICLE(ID,BODY,INSTRUCTORID, AUTHORFNAME, AUTHORSNAME) 
    VALUES(
        article_id, 
        body, 
        i_id,
        (SELECT FNAME from _user WHERE _user.ID =  i_id), 
        (SELECT SNAME from _user WHERE _user.ID =  i_id)
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_course` (IN `title` VARCHAR(50), IN `description` VARCHAR(800), IN `image` VARCHAR(400), IN `pre` VARCHAR(256), IN `i_id` INT(10), OUT `course_id` INT(10))   BEGIN    
    INSERT INTO ELEMENT(TITLE,DESCRIPTION,IMAGE) VALUES (title, description, image);
    SET course_id = LAST_INSERT_ID();
    INSERT INTO COURSE(ID,PREREQUISITES,INSTRUCTORID, 	INSTRUCTORFNAME, INSTRUCTORSNAME) 
    VALUES(
        course_id, 
        pre, 
        i_id,
        (SELECT FNAME from _user WHERE _user.ID =  i_id), 
        (SELECT SNAME from _user WHERE _user.ID =  i_id)
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_lesson` (IN `name` VARCHAR(32), IN `description` VARCHAR(256), IN `cid` INT(11), IN `qid` INT(11), IN `aid` INT(11), OUT `lesson_id` INT(11))   BEGIN
    INSERT INTO lesson(NAME, DESCRIPTION, CID, QID, AID) VALUES (name, description, cid, qid, aid);
    SET lesson_id = LAST_INSERT_ID();
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_quiz` (IN `title` VARCHAR(50), IN `description` VARCHAR(800), IN `image` VARCHAR(400), IN `max_score` INT(10), IN `i_id` INT(10), OUT `quiz_id` INT(10))   BEGIN    
    INSERT INTO ELEMENT(TITLE,DESCRIPTION,IMAGE) VALUES (title, description, image);
    SET quiz_id = LAST_INSERT_ID();
    INSERT INTO quiz(ID,MAXSCORE,INSTRUCTORID, INSTRUCTORFNAME, INSTRUCTORSNAME) 
    VALUES(
        quiz_id, 
        max_score, 
        i_id,
        (SELECT FNAME from _user WHERE _user.ID =  i_id), 
        (SELECT SNAME from _user WHERE _user.ID =  i_id)
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTopicsReport` ()  READS SQL DATA BEGIN
    SELECT T.NAME, T.ID ,
    (SELECT COUNT(DISTINCT(QT.QID)) FROM quiz_question_topic QT WHERE QT.TID = T.ID ) AS number_of_quizzes,
    (SELECT COUNT(DISTINCT(A.AID)) FROM article_topic A WHERE A.TID = T.ID ) AS number_of_articles,
    (SELECT COUNT(DISTINCT(CT.CID)) FROM course_topic CT WHERE CT.TID = T.ID ) AS number_of_courses
    from topic T;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsersReport` ()   BEGIN
    
    SELECT COUNT(U.ID) as num_of_users,  
    SUM(U.ISADMIN) AS num_of_admins ,
    (SELECT COUNT(I.ID)  from instructor I)as num_of_instructors
    from _user U;
  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TopEnrolledCourses` ()   BEGIN
      SELECT 
    C.INSTRUCTORFNAME, C.INSTRUCTORSNAME, E.*, 
    (SELECT COUNT(L.SID) FROM enroll L WHERE L.CID = C.ID ) as enrolls_count 
    FROM course C, element E WHERE E.ID = C.ID
    ORDER BY enrolls_count DESC
    LIMIT 10;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TopLikedArticles` ()   BEGIN
    SELECT 
    A.AUTHORFNAME, A.AUTHORSNAME, A.INSTRUCTORID, 
    E.*, (SELECT COUNT(L.UID) FROM likeonarticle L WHERE L.AID = A.ID ) as likes 
    FROM article A, element E WHERE E.ID = A.ID
    ORDER BY likes DESC
    LIMIT 10;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TopRatedCourses` ()   BEGIN
    SELECT 
    C.INSTRUCTORFNAME, C.INSTRUCTORSNAME, E.*, 
    (SELECT COUNT(L.SID) FROM enroll L WHERE L.CID = C.ID ) as enrolls_count,
    (SELECT SUM(L.REVIEWRATING)/COUNT(L.REVIEWRATING) FROM enroll L WHERE L.CID = C.ID ) as average_rating 
    FROM course C, element E WHERE E.ID = C.ID
    ORDER BY average_rating DESC
    LIMIT 10;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TopTakenQuizzes` ()   BEGIN
    SELECT E.CREATIONDATE, E.TITLE, E.IMAGE, E.DESCRIPTION,
    Q.*, (SELECT COUNT(DISTINCT  QQT.NID) FROM quiz_question_topic QQT WHERE QQT.QID=Q.ID) as numOfQuestions,
    (SELECT COUNT(STQ.SID) FROM studenttakesquiz STQ WHERE STQ.QID=Q.ID) as numOfStudents 
    FROM quiz Q, element E
    WHERE Q.ID=E.ID
    ORDER BY numOfStudents DESC
    LIMIT 10;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `ID` int(11) NOT NULL,
  `BODY` longtext NOT NULL CHECK (octet_length(`BODY`) >= 20),
  `INSTRUCTORID` int(11) DEFAULT NULL,
  `AUTHORFNAME` varchar(32) DEFAULT NULL CHECK (`AUTHORFNAME`  not like '%[^a-zA-Z]%' and octet_length(`AUTHORFNAME`) >= 3),
  `AUTHORSNAME` varchar(32) DEFAULT NULL CHECK (`AUTHORSNAME`  not like '%[^a-zA-Z]%' and octet_length(`AUTHORSNAME`) >= 3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`ID`, `BODY`, `INSTRUCTORID`, `AUTHORFNAME`, `AUTHORSNAME`) VALUES
(1, '\r\n# Project Title\r\n\r\nA brief description of what this project does and who it`s for\r\n\r\n\r\n## ???? About Me\r\nI`m a full stack developer...\r\n\r\n\r\n# Hi, I`m Katherine! ????\r\n\r\n\r\n## ???? Links\r\n[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)\r\n[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)\r\n[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)\r\n\r\n\r\n## ???? Skills\r\nJavascript, HTML, CSS...\r\n\r\n\r\n## Lessons Learned\r\n\r\nWhat did you learn while building this project? What challenges did you face and how did you overcome them?\r\n\r\n\r\n![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)\r\n\r\n\r\n## Optimizations\r\n\r\nWhat optimizations did you make in your code? E.g. refactors, performance improvements, accessibility\r\n\r\n\r\n## Roadmap\r\n\r\n- Additional browser support\r\n\r\n- Add more integrations\r\n\r\n\r\n## Used By\r\n\r\nThis project is used by the following companies:\r\n\r\n- Company 1\r\n- Company 2\r\n\r\n\r\n## Screenshots\r\n\r\n![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)\r\n\r\n\r\n## Run Locally\r\n\r\nClone the project\r\n\r\n```bash\r\n  git clone https://link-to-project\r\n```\r\n\r\nGo to the project directory\r\n\r\n```bash\r\n  cd my-project\r\n```\r\n\r\nInstall dependencies\r\n\r\n```bash\r\n  npm install\r\n```\r\n\r\nStart the server\r\n\r\n```bash\r\n  npm run start\r\n```\r\n\r\n\r\n## Installation\r\n\r\nInstall my-project with npm\r\n\r\n```bash\r\n  npm install my-project\r\n  cd my-project\r\n```\r\n    ', 2, 'admin', 'aliaa'),
(4, 'how to kill react and database before it kill you ', 2, 'admin', 'aliaa'),
(5, 'how to kill react and database before it kill you ', 2, 'admin', 'aliaa'),
(6, 'how to kill react and database before it kill you ', 2, 'admin', 'aliaa'),
(7, '## how this happen to us when we are so so fine \\n \\r we get all what we want', 2, 'admin', 'aliaa'),
(8, '## small thing\r\nwe all new small things in our lide', 2, 'admin', 'aliaa'),
(9, 'adhaodifchzpsojdpoAKFS\r\nadhaodifchzpsojdpoAKFSadhaodifchzpsojdpoAKFSadhaodifchzpsojdpoAKFSadhaodifchzpsojdpoAKFSadhaodifchzpsojdpoAKFS\r\n\r\n\r\nadhaodifchzpsojdpoAKFS\r\nadhaodifchzpsojdpoAKFSadhaodifchzpsojdpoAKFSadhaodifchzpsojdpoAKFS\r\nadhaodifchzpsojdpoAKFS\r\n\r\nadhaodifchzpsojdpoAKFS', 2, 'admin', 'aliaa'),
(10, 'akda;dj\r\nakda;dj\r\nakda;djakda;djakda;djakda;djakda;djakda;djakda;dj', 2, 'admin', 'aliaa'),
(11, '- aliaa\r\n- gheis\r\n- modern life\r\n- comics', 2, 'admin', 'aliaa'),
(12, '- aliaa\r\n- gheis\r\n- modern life\r\n- comics', 2, 'admin', 'aliaa'),
(13, '- aliaa\r\n- gheis\r\n- modern life\r\n- comics', 2, 'admin', 'aliaa'),
(17, 'react-howto\r\nIf you’re new to React (or frontend in general) you may find the ecosystem confusing. There are a few reasons for this.\r\n\r\nReact has historically been targeted at early-adopters and experts\r\nFacebook only open-sources what it actually uses, so it doesn’t focus on tooling for smaller-than-Facebook projects\r\nThere’s a lot of bad marketing masquerading as React guides\r\nThroughout this document, I’ll assume you’ve built a web page with HTML, CSS and JavaScript.\r\n\r\nWhy should you listen to me?\r\nThere’s a ton of conflicting advice about React out there; why listen to me?\r\n\r\nI was one of the original members of the Facebook team that built and open-sourced React. I’m no longer at Facebook and I’m now at a small startup, so I have a non-Facebook perspective as well.\r\n\r\nHow to tackle the React ecosystem\r\nAll software is built on a stack of technologies, and you need to understand enough of that stack to build your app. The reason why the React ecosystem of tooling seems overwhelming is because it’s always explained in the wrong order.\r\n\r\nYou should learn, in this order, without skipping ahead or learning concurrently:\r\n\r\nReact itself\r\nnpm\r\nJavaScript “bundlers”\r\nES6\r\nRouting\r\nFlux\r\nYou don\'t need to learn all of these to be productive with React. Only move to the next step if you have a problem that needs to be solved.\r\n\r\nAdditionally, there are a few topics that are often mentioned in the React community that are \"bleeding edge\". The topics below are interesting, but they\'re difficult to understand, are far less popular than the above topics and aren\'t required for most apps.\r\n\r\nInline styles\r\nServer rendering\r\nImmutable.js\r\nRelay, Falcor, etc\r\nLearning React itself\r\nIt’s a common misconception that you need to waste a lot of time setting up tooling to start to learn React. In the official documentation you’ll find a copy-paste HTML template that you can save in an .html file and get started right away. No tooling is required for this step, and don’t start learning extra tooling until you’re comfortable with React basics.\r\n\r\nI still think the easiest way to learn React is the official tutorial.\r\n\r\nLearning npm\r\nnpm is the Node.js package manager and is the most popular way front-end engineers and designers share JavaScript code. It includes a module system called CommonJS and lets you install command-line tools written in JavaScript. Read this post for background on why CommonJS is necessary for browsers, or the CommonJS Spec Wiki for more on the CommonJS API.\r\n\r\nMost reusable components, libraries and tools in the React ecosystem are available as CommonJS modules and are installed with npm.\r\n\r\nLearning JavaScript bundlers\r\nFor a number of good technical reasons CommonJS modules (i.e. everything in npm) cannot be used natively in the browser. You need a JavaScript “bundler” to “bundle” these modules into .js files that you can include in your web page with a <script> tag.\r\n\r\nExamples of JavaScript bundlers include webpack and browserify. Both are good choices, but I prefer webpack since it has a lot of features that make development of large apps easier. Since its documentation can be confusing, I have a plug-and-play template for getting started and I wrote a how-to guide for webpack for more complex use cases.\r\n\r\nReact also now offers an officially supported CLI tool called Create React App. It lets you create React projects powered by webpack without any configuration. It has its limitations, but it can serve as a great starting point, and its updates will add more features over time. It also offers an \"ejection\" feature that copies all configs and dependencies into your project so you have full control over them.\r\n\r\nOne thing to keep in mind: CommonJS uses the require() function to import modules, so a lot of people get confused and think that it has something to do with a project called require.js. For a number of technical reasons, I would suggest that you avoid require.js. It’s also not very popular in the React ecosystem.\r\n\r\nLearning ES6\r\nOutside of JSX (which you learned in the React tutorial), you may see some funny syntax in React examples. This is called ES6, and it’s the latest version of JavaScript so you may not have learned it yet. Since it’s so new, it’s not supported in browsers yet, but your bundler can translate it for you with the proper configuration.\r\n\r\nIf you just want to get things done with React, you can skip learning ES6, or try to pick it up along the way.\r\n\r\nYou may see some talk about ES6 classes being the preferred way to create React components. This is untrue. Most people (including Facebook) are using React.createClass().\r\n\r\nLearning routing\r\n“Single-page applications” are all the rage these days. These are web pages that load once, and when the user clicks on a link or a button, JavaScript running on the page updates the address bar, but the web page is not refreshed. Management of the address bar is done by something called a router.\r\n\r\nThe most popular router in the React ecosystem is react-router. If you’re building a single-page application, use it unless you have a good reason not to.\r\n\r\nDon’t use a router if you aren’t building a single-page application. Most projects start out as smaller components inside of a larger application anyway.\r\n\r\nLearning Flux\r\nYou’ve probably heard of Flux. There’s a ton of misinformation about Flux out there.\r\n\r\nA lot of people sit down to build an app and want to define their data model, and they think they need to use Flux to do it. This is the wrong way to adopt Flux. Flux should only be added once many components have already been built.\r\n\r\nReact components are arranged in a hierarchy. Most of the time, your data model also follows a hierarchy. In these situations Flux doesn’t buy you much. Sometimes, however, your data model is not hierarchical. When your React components start to receive props that feel extraneous, or you have a small number of components starting to get very complex, then you might want to look into Flux.\r\n\r\nYou’ll know when you need Flux. If you aren’t sure if you need it, you don’t need it.\r\n\r\nIf you have decided to use Flux, the most popular and well-documented Flux library is Redux. There are a lot of alternatives out there, and you’ll be tempted to evaluate lots of them, but my advice is to just stick with the most popular one.\r\n\r\nLearning inline styles\r\nPre-React, a lot of people reused CSS styles with complicated style sheets built by preprocessors like SASS. Since React makes writing reusable components easy, your stylesheets can be less complicated. Many in the community (including myself) are experimenting with getting rid of stylesheets altogether.\r\n\r\nThis is a fairly crazy idea for a number of reasons. It makes media queries more difficult, and it\'s possible that there are performance limitations using this technique. When starting out with React, just style things the way you normally would.\r\n\r\nOnce you\'ve got a feel for how React works, you can look at alternate techniques. One popular one is BEM. I recommend phasing out your CSS preprocessor, since React gives you a more powerful way to reuse styles (by reusing components) and your JavaScript bundler can generate more efficient stylesheets for you (I gave a talk about this at OSCON). With that said, React, like any other JavaScript library, will work just fine with a CSS preprocessor.\r\n\r\nAlternatively, you can also use CSS Modules, more specifically react-css-modules. With CSS Modules you\'ll still write CSS (or SASS/LESS/Stylus), but you can manage and compose your CSS files like you\'d do with inline styles in React. And you don\'t need to worry about managing your class names using methodologies like BEM, as this will be handled for you under the hood by the module system.\r\n\r\nLearning server rendering\r\nServer rendering is often called \"universal\" or \"isomorphic\" JS. It means that you can take your React components and render them to static HTML on the server. This improves initial startup performance because the user does not need to wait for JS to download in order to see the initial UI, and React can re-use the server-rendered HTML so it doesn\'t need to generate it client-side.\r\n\r\nYou need server rendering if you notice that your initial render is too slow or if you want to improve your search engine ranking. While it\'s true that Google now indexes client-rendered content, as of January 2016 every time it\'s been measured it\'s been shown to negatively affect ranking, potentially because of the performance penalty of client-side rendering.\r\n\r\nServer rendering still requires a lot of tooling to get right. Since it transparently supports React components written without server rendering in mind, you should build your app first and worry about server rendering later. You won\'t need to rewrite all of your components to support it.\r\n\r\nLearning Immutable.js\r\nImmutable.js provides a set of data structures that can help to solve certain performance issues when building React apps. It\'s a great library, and you\'ll probably use it a lot in your apps moving forward, but it\'s completely unnecessary until you have an appreciation of the performance implications.\r\n\r\nLearning Relay, Falcor etc\r\nThese are technologies that help you reduce the number of AJAX requests. They’re still very cutting-edge, so if you don’t have a problem with too many AJAX requests, you don’t need Relay or Falcor.', 2, 'admin', 'aliaa'),
(18, '“What’s new?” is an interesting and broadening eternal question, but one which, if pursued exclusively, results only in an endless parade of trivia and fashion, the silt of tomorrow. I would like, instead, to be concerned with the question “What is best?,” a question which cuts deeply rather than broadly, a question whose answers tend to move the silt downstream.\r\n\r\nRobert Pirsig\r\n\r\nWhen React came out, virtual DOM got everyone talking. It was a breakthrough and, like any good piece of engineering, it was built with carefully considered tradeoffs.\r\n\r\nThe concept was so simple and powerful at the same time that it became the way people introduce and differentiate React from other front-end frameworks and libraries. “React is a view layer that uses virtual DOM for performance.” Another motto you can often hear is “React can be used as the V in MVC.” At the time, downplaying React’s role in application architecture was intentional because React already had too many “seemingly bad” ideas to risk alienating people by adding some more.\r\n\r\nIn fact, React is not at all about virtual DOM. It’s an implementation detail that made React famous, but it overshadowed other concepts that are less shiny but more important in the long run.\r\n\r\nNow that we’re not surprised by virtual DOM anymore and it is being adopted by other frameworks and libraries, we can focus on examining React’s true strengths: composition, unidirectional data flow, freedom from DSLs, explicit mutation and static mental model.\r\n\r\nWe will examine these topics in next articles.\r\n\r\nTo be continued.', 1, 'aliaa', 'gheis'),
(19, 'Hmm, let\'s look at a concrete example to see what the difference is. For example, what if we have a computationally expensive getDataWithinRange() function that returns a filtered dataset, based on a specified dateRange? Because getDataWithinRange() takes some time to run, we\'ll want to store it in our component\'s state object and only update it when dateRange changes.\r\n\r\nCLASS COMPONENT\r\nFUNCTION COMPONENT\r\nWith lifecycle events, we need to deal with all changes in one spot. Our thinking looks something like:When our component loads, and when props change (specifically dateRange), update data\r\n\r\nIn a function component, we need to think about what values stay in-sync. Each update flows more like the statement:Keep data in sync with dateRange\r\n\r\nclass Chart extends Component {\r\n  state = {\r\n    data: null,\r\n  }\r\n  componentDidMount() {\r\n    const newData = getDataWithinRange(this.props.dateRange)\r\n    this.setState({data: newData})\r\n  }\r\n  componentDidUpdate(prevProps) {\r\n    if (prevProps.dateRange != this.props.dateRange) {\r\n      const newData = getDataWithinRange(this.props.dateRange)\r\n      this.setState({data: newData})\r\n    }\r\n  }\r\n  render() {\r\n    return (\r\n      <svg className=\"Chart\" />\r\n    )\r\n  }\r\n}\r\nconst Chart = ({ dateRange }) => {\r\n  const [data, setData] = useState()\r\n  useEffect(() => {\r\n    const newData = getDataWithinRange(dateRange)\r\n    setData(newData)\r\n  }, [dateRange])\r\n  return (\r\n    <svg className=\"Chart\" />\r\n  )\r\n}\r\nLet\'s pretend that we\'re either defining getDataWithinRange() outside of the component, or substituting it for inline code that generates the newData. For this simple example, we\'ll skip that definition so we can focus on the concepts.\r\nSee how much easier it is to wrap your head around the concept of keeping variables in-sync?\r\n\r\nCLASS COMPONENT\r\nFUNCTION COMPONENT\r\nIn fact, this last example was still thinking inside the class-component box. We\'re storing data in state to prevent re-calculating it every time our component updates.\r\n\r\nBut we no longer need to use state! Here to the rescue is useMemo(), which will only re-calculate data when its dependency array changes.', 3, 'aliaa', 'testsme'),
(20, 'React/Redux Links\r\nCurated tutorial and resource links I`ve collected on React, Redux, ES6, and more, meant to be a collection of high-quality articles and resources for someone who wants to learn about the React-Redux ecosystem, as well as a source for quality information on advanced topics and techniques. Not quite \"awesome\", but hopefully useful as a starting point I can give to others. Suggestions welcome.\r\n\r\nAnother important resource is the Reactiflux community on Discord, which has chat channels dedicated to discussion of React, Redux, and other related technologies. There`s always a number of people hanging out and answering questions, and it`s a great place to ask questions and learn. The invite link is at https://www.reactiflux.com.\r\n\r\nYou might also want to check out my categorized list of Redux-related addons, libraries, and utilities, at Redux Ecosystem Links. Also see Community Resources for links to other links lists, podcasts, and email newsletters. Finally, I also keep a dev blog at blog.isquaredsoftware.com, where I write about React, Redux, Webpack, and more.', 1, 'aliaa', 'gheis'),
(21, 'Last week, Open AI released this new ChatGPT assistant, and it has taken the world by storm.\r\n\r\nBut what is ChatGPT, and how does it work?\r\n\r\nAccording to the official announcement:\r\n\r\nWe’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.\r\n\r\nChatGPT is optimized for dialogue, and this makes it somewhat different from GitHub Copilot.\r\n\r\nTo find out how good it is with Dart & Flutter, I decided to take it for a ride and test it with various coding tasks.\r\n\r\nSo in this article, I\'ll share some of my experiments with ChatGPT, show you how well it did, and try to give objective answers to the most pressing questions in life:\r\n\r\nCan you trust ChatGPT to produce correct code for you? 😉\r\nHow to make the most of it? 🛠\r\nWill AI take your job away? 😱\r\nReady? Let\'s dive in!\r\n\r\nSPONSOR\r\n\r\nCode with Andrea is free for everyone. Help me keep it that way by checking out this sponsor:\r\n10x your Flutter productivity.\r\n10x your Flutter productivity. Use FlutterFlow\'s visual builder to generate clean Flutter code and take your Flutter productivity to the next level. FlutterFlow comes with Flutter + Firebase integration, custom code extensibility, web app + multi-language support, and one-click deploy enabling you to ship apps faster than ever.\r\n\r\nUsing ChatGPT with Dart & Flutter: Methodology\r\nTo get started, I decided to test ChatGPT on various kinds of tasks:\r\n\r\nDetect and correct common coding errors\r\nExplain how code works\r\nWrite or complete code to solve a given task\r\nFor code writing tasks, I followed a two-step process:\r\n\r\nask to write code to solve a specific, discrete problem\r\nverify if the code compiles, runs, and produces the correct output\r\nWhen the output was not as expected, I asked follow-up questions to see if ChatGPT would correct itself.\r\n\r\nI repeated this process with nine different tasks. You can find all the results below, along with my observations. 👇\r\n\r\nNote that this is a long article. If you\'re short on time and want to cut to the chase, feel free to jump to the final results and evaluation.\r\n\r\nFor improved readability, I have included my dialogues with ChatGPT without modifications (rather than pasting screenshots). You can ask the very same questions on the ChatGPT page if you wish - though note that the output can vary, and ChatGPT will produce slightly different responses every time. To learn about how the model was trained, read here and here.', 2, 'admin', 'aliaa'),
(22, 'If you\'ve been using Riverpod for some time, you probably know how to declare providers and use them inside your widgets.\r\n\r\nYou may also know that providers are global, but their state isn\'t.\r\n\r\nBut how do providers really work under the hood?\r\n\r\nHave you ever wondered:\r\n\r\nWhen are providers initialized?\r\nWhen and how do they get disposed?\r\nWhat happens when a widget listens to a provider?\r\nWhat is the lifecycle of a provider?\r\nHow does Riverpod do data caching?\r\nThis article will answer all these questions and help you:\r\n\r\nbetter understand the relationship between providers and widgets\r\nlearn how data caching works and how it\'s related to provider lifecycle events\r\nchoose the most appropriate data caching behaviour according to your needs\r\nIt will also help you view Riverpod for what it is: a Reactive Caching and Data-binding Framework that helps you solve complex problems (like data caching) with simple code.\r\n\r\nData caching is a broad topic, so we\'ll cover cache invalidation and other advanced techniques in a follow-up article.\r\n\r\nBut for now, we\'ve got plenty to cover already!\r\n\r\nReady? Let\'s go! 🚀\r\n\r\nThis article assumes that you already know the basics. If you\'re new to Riverpod, read this first: Flutter Riverpod 2.0: The Ultimate Guide\r\n\r\nSPONSOR\r\n\r\nCode with Andrea is free for everyone. Help me keep it that way by checking out this sponsor:\r\n10x your Flutter productivity.\r\n10x your Flutter productivity. Use FlutterFlow\'s visual builder to generate clean Flutter code and take your Flutter productivity to the next level. FlutterFlow comes with Flutter + Firebase integration, custom code extensibility, web app + multi-language support, and one-click deploy enabling you to ship apps faster than ever.', 3, 'aliaa', 'testsme'),
(23, 'Writing Flutter apps got a lot easier with the release of Riverpod 2.0.\r\n\r\nThe new @riverpod syntax lets us use build_runner to generate all the providers on the fly.\r\n\r\nAnd the new AsyncNotifier class makes it easier to perform asynchronous initialization with a more ergonomic API, compared to the good old StateNotifier.\r\n\r\nI\'ve already covered many of the Riverpod 2.0 changes in these two articles:\r\n\r\nHow to Auto-Generate your Providers with Flutter Riverpod Generator\r\nHow to use Notifier and AsyncNotifier with the new Flutter Riverpod Generator\r\nBut when it comes to writing tests, things can get tricky, and it can be challenging to get them working.\r\n\r\nAnd if we upgrade our code by replacing StateNotifier with AsyncNotifier, we will find that old tests based on StateNotifier will no longer work.\r\n\r\nSo in this article, we\'ll learn how to write unit tests for AsyncNotifier subclasses.\r\n\r\nHere is what we will cover:\r\n\r\nhow to work with ProviderContainer and override providers inside our tests\r\nhow to set up a provider listener using a ProviderSubscription\r\nhow to verify that the listener is called using the mocktail package\r\nAlong the way, we\'ll discover some gotchas and highlight the advantages of testing with listeners vs. streams.\r\n\r\nBy the end of this article, you\'ll have a better understanding and a clear template for writing unit tests with Riverpod. 💪\r\n\r\nThe official Riverpod docs already include a helpful page about testing, but it doesn\'t show how to write asynchronous tests for classes with dependencies. This article will fill the gaps.', 4, 'menna', 'ahmed'),
(24, 'Writing Flutter apps using Riverpod got a lot easier with the introduction of the riverpod_generator package.\r\n\r\nUsing the new Riverpod syntax, we use the @riverpod annotation and let build_runner generate all the providers on the fly.\r\n\r\nI have already covered all the basics in this article:\r\n\r\nHow to Auto-Generate your Providers with Flutter Riverpod Generator\r\nAnd in this article, we\'ll take things further and learn about the Notifier and AsyncNotifier classes that were added to Riverpod 2.0.\r\n\r\nThese classes are meant to replace StateNotifier and bring some new benefits:\r\n\r\neasier to perform complex, asynchronous initialization\r\nmore ergonomic API: no longer need to pass ref around\r\nno longer need to declare the providers manually (if we use Riverpod Generator)\r\nBy the end, you\'ll know how to create custom state classes with minimal effort, and quickly generate complex providers using riverpod_generator.\r\n\r\nReady? Let\'s go! 🔥\r\n\r\nThis article assumes that you\'re already familiar with Riverpod. If you\'re new to Riverpod, read: Flutter Riverpod 2.0: The Ultimate Guide\r\n\r\nSPONSOR\r\n\r\nCode with Andrea is free for everyone. Help me keep it that way by checking out this sponsor:\r\n10x your Flutter productivity.\r\n10x your Flutter productivity. Use FlutterFlow\'s visual builder to generate clean Flutter code and take your Flutter productivity to the next level. FlutterFlow comes with Flutter + Firebase integration, custom code extensibility, web app + multi-language support, and one-click deploy enabling you to ship apps faster than ever.', 3, 'aliaa', 'testsme'),
(25, 'I’ve already tackled these questions in a previous article, showing how to implement nested navigation with a combination of Stack, Navigator, and Offstage widgets:\r\n\r\nFlutter Bottom Navigation Bar with Multiple Navigators: A Case Study\r\nHowever, my previous solution had some limitations and caused too many widget rebuilds.\r\n\r\nAnd since it was built with the Navigator 1.0 APIs, it didn\'t support deep linking and navigation by URL.\r\n\r\nSPONSOR\r\n\r\nCode with Andrea is free for everyone. Help me keep it that way by checking out this sponsor:\r\n10x your Flutter productivity.\r\n10x your Flutter productivity. Use FlutterFlow\'s visual builder to generate clean Flutter code and take your Flutter productivity to the next level. FlutterFlow comes with Flutter + Firebase integration, custom code extensibility, web app + multi-language support, and one-click deploy enabling you to ship apps faster than ever.\r\n\r\nGoRouter vs Beamer\r\nThe new Router API (also known as Navigator 2.0) was introduced to support deep linking, URL navigation, and additional use cases.\r\n\r\nIn turn, this led to packages such as GoRouter and Beamer, that provide simple yet powerful routing APIs to meet the needs of all Flutter apps across different platforms.\r\n\r\nSo in this article, I\'ll show you how to implement nested navigation using both GoRouter (by exploring the new ShellRoute API) and Beamer, offering a fair comparison between these two packages for this common use case.\r\n\r\nNested navigation is also supported by the AutoRoute package, but we won\'t cover it here. Refer to the documentation for more details about nested navigation with AutoRoute.', 4, 'menna', 'ahmed'),
(26, 'Why is goal setting important when learning English?\r\nNerida says goal setting is important because it reminds you of how far you have come.\r\n\r\n“There is nothing better than finding your old goals and looking at how challenging and difficult you thought they were. When you see all your progression laid out like that, it can be very motivating,” she says.\r\n\r\nAsking questions like “What are you trying to improve your English” and “Why are you learning English” is a constant reminder of where you’re going with your language learning journey, according to Maria. She adds that goal setting contributes to higher motivation levels.\r\n\r\nIf language learners think of goals as bricks and learning a language as building a house, Nerida says learners will quickly realise they have to have solid foundations.\r\n\r\n“That way, we have not got gaps, we can build this beautiful house that\'s very strong and it can do what you want it to do,” she says.\r\n\r\nWhat are examples of good goals?\r\nSo if goal setting is important in learning English, how do we set good goals? First, context is important. Maria says it’s important to set personal goals within the context of what you’re doing. Ask yourself: Are you preparing for university? Or are you learning for leisure? That will help you set the appropriate learning goals.\r\n\r\nAnother thing to consider is what type of goal you want to set. Again, it depends on your context. Here are some examples of the types of goals you can set for language learning success:\r\n\r\nTime-based goals\r\nAn example of a time-based goal is spending a fixed amount of time – say 30 minutes – on something related to English every day or every second day. For example, reading a novel, watching an English drama or listening to an audio book.', NULL, 'aliaa', 'gheis'),
(27, 'Think of technology you have used recently. What problems did you have with it? What solutions did you come up with to solve the problem?\r\n\r\nFirst, let’s look at language related to problems. If you are experiencing an issue with a laptop or video conferencing technology for example, you can say:\r\n\r\nIt’s broken down.\r\nIt needs fixing./It needs to be fixed.\r\nIt’s out of order.\r\nIt’s not working.\r\nIt’s frozen.\r\nIt has crashed.\r\nIt doesn’t work.\r\nIt keeps making this strange noise.\r\nWe have to sort it out.\r\nI can\'t unmute.\r\nI can\'t hear you./You\'re on mute.\r\nIt\'s not opening.\r\nYou dropped out there for a second.\r\nWhen talking about problems related to mobile phones, you could use the following:\r\n\r\nThere is no reception.\r\nYou\'re breaking up.\r\nI can\'t hear you./You\'re inaudible.\r\nNext, let’s look at language related to solutions. Here is what you can say:\r\n\r\nHave you tried switching/turning it on and off?\r\nHave you tried restarting your device?\r\nIt\'s sorted.\r\nIt’s fixed!\r\nIt’s working now.\r\nIt’s all done.\r\nI can see you clearly now.\r\nIf you have tried your best to solve the problem and none of the solutions you had in mind worked, it\'s alright to say:\r\n\r\nI\'m sorry I don\'t know what the issue is. Maybe it\'s best I send you an email.\r\nI\'m sorry I can\'t help here. Shall we reschedule to another time?', 2, 'admin', 'aliaa'),
(28, 'The other day, my four-year-old boy was asking me, \"Mummy, do you know my dinosaurs\' names?\"\r\n\r\nI was like, \"No baby, what are they?\"\r\n\r\n\"They are Triceratops and Stegosaurus,\" he said clearly.\r\n\r\n\"What? Again, what?\" Somehow, my tongue didn\'t work!\r\n\r\n\"Oh Mummy,\" he laughed.\r\n\r\nLater, he turned around and asked my husband, \"Daddy, can you say the names? Mummy doesn\'t know.\"\r\n\r\nI was feeling so embarrassed that I couldn\'t say these dinosaurs\' names while my son said them clearly — a four-year-old kid.\r\n\r\nI have been in Australia since I was a teenager. Although I wasn\'t born into an English environment, I graduated from an Australian university, got married to someone from a different cultural background, and am in an English-speaking world 24/7.\r\n\r\nBut I still experience some difficulties saying and understanding specific words or slang. I feel this is not as right as my kids can pick up pronunciation and meaning, even if they are only three and four.\r\n\r\n\"I definitely think children grasp the English language more easily than adults, as adults have a lifetime of their native language,\" says Michelle Thomas, who has been in the early childhood sector for over 34 years.\r\n\r\n\"Children have a wider capacity to grasp English while retaining their mother language,\" she adds. \"Adults\' brains are already wired, and children\'s brains are still developing.\"', 4, 'menna', 'ahmed'),
(29, 'The APIs available to a Node.js app consist of:\r\n\r\nThe ECMAScript standard library (which is part of the language)\r\nNode.js APIs (which are not part of the language proper):\r\nSome of the APIs are provided via global variables:\r\nEspecially cross-platform web APIs such as fetch and CompressionStream fall into this category.\r\nBut a few Node.js-only APIs are global, too – for example, process.\r\nThe remaining Node.js APIs are provided via built-in modules – for example, \'node:path\' (functions and constants for handling file system paths) and \'node:fs\' (functionality related to the file system).\r\nThe Node.js APIs are partially implemented in JavaScript, partially in C++. The latter is needed to interface with the operating system.\r\n\r\nNode.js runs JavaScript via an embedded V8 JavaScript engine (the same engine used by Google’s Chrome browser).\r\n\r\nGlobal Node.js variables  \r\nThese are a few highlights of Node’s global variables:\r\n\r\ncrypto gives us access to a web-compatible crypto API.\r\n\r\nconsole has much overlap with the same global variable in browsers (console.log() etc.).\r\n\r\nfetch() lets us use the Fetch browser API.\r\n\r\nprocess contains an instance of class Process and gives us access to command line arguments, standard input, standard out, and more.\r\n\r\nstructuredClone() is a browser-compatible function for cloning objects.\r\n\r\nURL is a browser-compatible class for handling URLs.\r\n\r\nMore global variables are mentioned throughout this blog post.', 4, 'menna', 'ahmed'),
(30, 'In An Introduction to GraphQL, you learned that GraphQL is an open-source query language and runtime for APIs created to solve issues that are often experienced with traditional REST API systems.\r\n\r\nA good way to begin understanding how all the pieces of GraphQL fit together is to make a GraphQL API server. Although Apollo GraphQL is a popular commercial GraphQL implementation favored by many large companies, it is not a prerequisite for making your own GraphQL API server.\r\n\r\nIn this tutorial, you will make an Express API server in Node.js that serves up a GraphQL endpoint. You will also build a GraphQL schema based on the GraphQL type system, including operations, such as queries and mutations, and resolver functions to generate responses for any requests. You will also use the GraphiQL integrated development environment (IDE) to explore and debug your schema and query the GraphQL API from a client.\r\n\r\nPrerequisites\r\nTo follow this tutorial, you will need:\r\n\r\nA local Node.js environment, which you can set up by following the How To Install Node.js and Create a Local Development Environment tutorial for your operating system and distribution.\r\nAn understanding of the fundamental concepts of GraphQL, which you can find in the tutorial, An Introduction to GraphQL.\r\nFamiliarity with HTTP.\r\nA basic knowledge of HTML and JavaScript, which you can gain from the series, How To Build a Website With HTML and How To Code in JavaScript.', 4, 'menna', 'ahmed'),
(31, 'AI is currently one of the hottest buzzwords in tech and with good reason. The last few years have seen several innovations and advancements that have previously been solely in the realm of science fiction slowly transform into reality. \r\n\r\nExperts regard artificial intelligence as a factor of production, which has the potential to introduce new sources of growth and change the way work is done across industries. For instance, this PWC article predicts that AI could potentially contribute $15.7 trillion to the global economy by 2035. China and the United States are primed to benefit the most from the coming AI boom, accounting for nearly 70% of the global impact.\r\nThis Simplilearn provides an overview of AI, including how it works, its pros and cons, its applications, certifications, and why it’s a good field to master.', 2, 'admin', 'aliaa'),
(36, 'The term artificial intelligence was coined in 1956, but AI has become more popular today thanks to increased data volumes, advanced algorithms, and improvements in computing power and storage.\r\n\r\nEarly AI research in the 1950s explored topics like problem solving and symbolic methods. In the 1960s, the US Department of Defense took interest in this type of work and began training computers to mimic basic human reasoning. For example, the Defense Advanced Research Projects Agency (DARPA) completed street mapping projects in the 1970s. And DARPA produced intelligent personal assistants in 2003, long before Siri, Alexa or Cortana were household names.\r\n\r\nThis early work paved the way for the automation and formal reasoning that we see in computers today, including decision support systems and smart search systems that can be designed to complement and augment human abilities.\r\n\r\nWhile Hollywood movies and science fiction novels depict AI as human-like robots that take over the world, the current evolution of AI technologies isn’t that scary – or quite that smart. Instead, AI has evolved to provide many specific benefits in every industry. Keep reading for modern examples of artificial intelligence in health care, retail and more.', 4, 'menna', 'ahmed'),
(37, 'How Does Artificial Intelligence Work?\r\nWhat Is AI?\r\nLess than a decade after helping the Allied forces win World War II by breaking the Nazi encryption machine Enigma, mathematician Alan Turing changed history a second time with a simple question: “Can machines think?” \r\n\r\nTuring’s 1950 paper “Computing Machinery and Intelligence” and its subsequent Turing Test established the fundamental goal and vision of AI.   \r\n\r\nAt its core, AI is the branch of computer science that aims to answer Turing’s question in the affirmative. It is the endeavor to replicate or simulate human intelligence in machines. The expansive goal of AI has given rise to many questions and debates. So much so that no singular definition of the field is universally accepted.\r\n\r\nCan machines think? – Alan Turing, 1950\r\n\r\n \r\n\r\nDefining AI\r\nThe major limitation in defining AI as simply “building machines that are intelligent” is that it doesn\'t actually explain what AI is and what makes a machine intelligent. AI is an interdisciplinary science with multiple approaches, but advancements in machine learning and deep learning are creating a paradigm shift in virtually every sector of the tech industry.\r\n\r\nHowever, various new tests have been proposed recently that have been largely well received, including a 2019 research paper entitled “On the Measure of Intelligence.” In the paper, veteran deep learning researcher and Google engineer François Chollet argues that intelligence is the “rate at which a learner turns its experience and priors into new skills at valuable tasks that involve uncertainty and adaptation.” In other words: The most intelligent systems are able to take just a small amount of experience and go on to guess what would be the outcome in many varied situations.', 4, 'menna', 'ahmed'),
(38, 'When one considers the computational costs and the technical data infrastructure running behind artificial intelligence, actually executing on AI is a complex and costly business. Fortunately, there have been massive advancements in computing technology, as indicated by Moore’s Law, which states that the number of transistors on a microchip doubles about every two years while the cost of computers is halved.\r\n\r\nAlthough many experts believe that Moore’s Law will likely come to an end sometime in the 2020s, this has had a major impact on modern AI techniques — without it, deep learning would be out of the question, financially speaking. Recent research found that AI innovation has actually outperformed Moore’s Law, doubling every six months or so as opposed to two years.\r\n\r\nBy that logic, the advancements artificial intelligence has made across a variety of industries have been major over the last several years. And the potential for an even greater impact over the next several decades seems all but inevitable.', 1, 'aliaa', 'gheis'),
(47, 'his is the first chapter in a step-by-step guide about main React concepts. You can find a list of all its chapters in the navigation sidebar. If you’re reading this from a mobile device, you can access the navigation by pressing the button in the bottom right corner of your screen.\r\n\r\nEvery chapter in this guide builds on the knowledge introduced in earlier chapters. You can learn most of React by reading the “Main Concepts” guide chapters in the order they appear in the sidebar. For example, “Introducing JSX” is the next chapter after this one.', 6, 'Menna', 'Ahmed'),
(50, 'Last week, Open AI released this new ChatGPT assistant, and it has taken the world by storm.\r\n\r\nBut what is ChatGPT, and how does it work?\r\n\r\nAccording to the official announcement:\r\n\r\nWe’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.\r\n\r\nChatGPT is optimized for dialogue, and this makes it somewhat different from GitHub Copilot.\r\n\r\nTo find out how good it is with Dart & Flutter, I decided to take it for a ride and test it with various coding tasks.\r\n\r\nSo in this article, I`ll share some of my experiments with ChatGPT, show you how well it did, and try to give objective answers to the most pressing questions in life:\r\n\r\nCan you trust ChatGPT to produce correct code for you? ????\r\nHow to make the most of it? ????\r\nWill AI take your job away? ????\r\nReady? Let`s dive in!\r\n\r\nSPONSOR\r\n\r\nCode with Andrea is free for everyone. Help me keep it that way by checking out this sponsor:\r\n10x your Flutter productivity.\r\n10x your Flutter productivity. Use FlutterFlow`s visual builder to generate clean Flutter code and take your Flutter productivity to the next level. FlutterFlow comes with Flutter + Firebase integration, custom code extensibility, web app + multi-language support, and one-click deploy enabling you to ship apps faster than ever.', 6, 'Menna', 'Ahmed'),
(52, '“If you only put into action half of what you read, you’d already be a millionaire.”\r\n\r\nI’ve heard many variations of this advice, all making the point that the problem isn’t that we don’t have good ideas, but that we implement little of it and therefore our lives don’t change, we don’t lose weight, grow wealth, improve our relationships or become happier.\r\n\r\nThe implication of this advice is that if you read a book and don’t apply it, you’ve just wasted your money. You ought to apply the lessons of what you read, or there was no point reading the book. I disagree.', 8, 'Ali', 'Sobhy'),
(54, 'Reading books is cheap. Kindle editions of popular books cost less than a nice meal. Libraries and borrowing books means you often don’t even need to pay that.\r\n\r\nEven the time spent to read a book is a fairly low investment. For almost any topics there are books which are good enough that reading them isn’t a chore. If you get in the habit you can probably easily read two dozen books a year.\r\n\r\nImplementing ideas, in contrast, is often quite expensive. Implementing just one idea from a book can take more time, money or effort than reading the book itself. Implementing all the ideas from a single book might take years.\r\nThe three meanings of meaning in life: Distinguishing coherence, purpose, and significance.', 8, 'Ali', 'Sobhy'),
(55, 'An idea from economics you should remember deeply is that when you have diminishing returns from an activity (meaning doing more and more gets less effective), then the optimal amount is when marginal cost equals marginal benefit.\r\n\r\nTo illustrate, imagine a machine that you put in $5 and it spits out money each time. At first it spits out $20 bills. After a while, only $10 bills come out. Eventually only few quarters spit out when you put in your $5. When should you stop using the machine?\r\n\r\nObviously, you should stop using the machine when it only gives you $5 back. That’s when marginal benefit (the amount of money you get each time) is equal to marginal cost (the amount you have to put in to run the machine).\r\n\r\nNow apply this reasoning to books. If a typical book you read costs $20 and requires twenty hours to read, but the value is life changing—you’re not reading enough books! You should keep putting in those $20 and twenty hours until books you read are worth about what you paid for them. Any less and you’re leaving money on the table.', 8, 'Ali', 'Sobhy'),
(56, 'Contrary to the popular wisdom, I think a book you never explicitly try to implement can still add value. Perhaps not life-changing, but at the very least, enough value to justify the relatively low cost invested in them.\r\n\r\nIt’s true, most books won’t change your life. But then again, you don’t need a life-changing amount of money and time to consume them. If you pick good books, read them well and think deeply about their implications, that’s enough to earn back their price tag (both in terms of dollars and hours spent).\r\n\r\nThere’s a few ways books have a lot of value, even if you don’t make a direct habit of implementing every idea:\r\n\r\n1. Good books limit bad choices.\r\nRead enough books about investing and you learn enough to steer away from some clearly bad habits on investing. Yes, the nth book you read may not cause you to change any behavior differently from the n-1 books you read before, but the accumulation of books on personal finance can keep you from spending and saving foolishly.\r\n\r\nIt’s often the things you don’t do after reading a book that justify the investment cost. If a book steers you away from bad strategies which won’t work, that alone can make it worth reading.\r\n\r\n2. Reading a lot ensures you have lots of good ideas.\r\nThe improvements I want to make in my own life and business often resemble a huge (near infinite) list of things I could be doing. I could refine my exercise habits, optimize a landing page, switch to a new productivity app, etc..\r\n\r\nThe list is usually far larger than I have time to accomplish. That’s okay. What reading a lot of books does is that it increases the overall quality of this list, so that the ideas I’m working on are better. The more you read, the better the average quality of your list, even if you haven’t set aside time to work on any specific idea', 8, 'Ali', 'Sobhy'),
(63, 'Why is goal setting important when learning English? Nerida says goal setting is important because it reminds you of how far you have come.\r\n\r\n“There is nothing better than finding your old goals and looking at how challenging and difficult you thought they were. When you see all your progression laid out like that, it can be very motivating,” she says.\r\n\r\nAsking questions like “What are you trying to improve your English” and “Why are you learning English” is a constant reminder of where you’re going with your language learning journey, according to Maria. She adds that goal setting contributes to higher motivation levels.\r\n\r\nIf language learners think of goals as bricks and learning a language as building a house, Nerida says learners will quickly realise they have to have solid foundations.\r\n\r\n“That way, we have not got gaps, we can build this beautiful house that`s very strong and it can do what you want it to do,” she says.\r\n\r\nWhat are examples of good goals? So if goal setting is important in learning English, how do we set good goals? First, context is important. Maria says it’s important to set personal goals within the context of what you’re doing. Ask yourself: Are you preparing for university? Or are you learning for leisure? That will help you set the appropriate learning goals.\r\n\r\nAnother thing to consider is what type of goal you want to set. Again, it depends on your context. Here are some examples of the types of goals you can set for language learning success:\r\n\r\nTime-based goals An example of a time-based goal is spending a fixed amount of time – say 30 minutes – on something related to English every day or every second day. For example, reading a novel, watching an English drama or listening to an audio book.', 6, 'Menna', 'Ahmed'),
(64, 'Think of technology you have used recently. What problems did you have with it? What solutions did you come up with to solve the problem?\r\n\r\nFirst, let’s look at language related to problems. If you are experiencing an issue with a laptop or video conferencing technology for example, you can say:\r\n\r\nIt’s broken down. It needs fixing./It needs to be fixed. It’s out of order. It’s not working. It’s frozen. It has crashed. It doesn’t work. It keeps making this strange noise. We have to sort it out. I can`t unmute. I can`t hear you./You`re on mute. It`s not opening. You dropped out there for a second. When talking about problems related to mobile phones, you could use the following:\r\n\r\nThere is no reception. You`re breaking up. I can`t hear you./You`re inaudible. Next, let’s look at language related to solutions. Here is what you can say:\r\n\r\nHave you tried switching/turning it on and off? Have you tried restarting your device? It`s sorted. It’s fixed! It’s working now. It’s all done. I can see you clearly now. If you have tried your best to solve the problem and none of the solutions you had in mind worked, it`s alright to say:\r\n\r\nI`m sorry I don`t know what the issue is. Maybe it`s best I send you an email. I`m sorry I can`t help here. Shall we reschedule to another time?', 6, 'Menna', 'Ahmed');
INSERT INTO `article` (`ID`, `BODY`, `INSTRUCTORID`, `AUTHORFNAME`, `AUTHORSNAME`) VALUES
(65, 'The w3-container class is the most important of the W3.CSS classes. It provides equality like:\r\n\r\nCommon margins\r\nCommon paddings\r\nCommon vertical alignments\r\nCommon horizontal alignments\r\nCommon fonts\r\nCommon colors\r\nThe w3-container class is typically used with HTML container elements, like:\r\n\r\n<div>, <header>, <footer>, <article>, <section>, <blockquote>, <form>, and more.', 6, 'Menna', 'Ahmed'),
(66, 'W3.CSS Display Classes\r\nW3.CSS provides the following display classes: \r\n\r\nClass	Defines\r\nw3-display-container	Container for w3-display-classes\r\nw3-display-topleft	Displays content at the top left corner of the w3-display-container\r\nw3-display-topright	Displays content at the top right corner of the w3-display-container\r\nw3-display-bottomleft	Displays content at the bottom left corner of the w3-display-container\r\nw3-display-bottomright	Displays content at the bottom right corner of the w3-display-container\r\nw3-display-left	Displays content to the left (middle left) of the w3-display-container\r\nw3-display-right	Displays content to the right (middle right) of the w3-display-container\r\nw3-display-middle	Displays content in the middle (center) of the w3-display-container\r\nw3-display-topmiddle	Displays content at the top middle of the w3-display-container\r\nw3-display-bottommiddle	Displays content at the bottom middle of the w3-display-container\r\nw3-display-position	Displays content at a specified position in the w3-display-container\r\nw3-display-hover	Displays content on hover inside the w3-display-container\r\nw3-left	Floats an element to the left (float: left)\r\nw3-right	Floats an element to the right (float: right)\r\nw3-show	Shows an element (display: block)\r\nw3-hide	Hides an element (display: none)\r\nw3-mobile	Adds mobile-first responsiveness to any element.\r\nDisplays elements as block elements on mobile devices', 6, 'Menna', 'Ahmed');

-- --------------------------------------------------------

--
-- Table structure for table `article_topic`
--

CREATE TABLE `article_topic` (
  `AID` int(11) NOT NULL,
  `TID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article_topic`
--

INSERT INTO `article_topic` (`AID`, `TID`) VALUES
(1, 1),
(1, 7),
(1, 8),
(1, 14),
(1, 15),
(1, 21),
(4, 4),
(5, 4),
(6, 4),
(7, 4),
(8, 4),
(9, 25),
(10, 1),
(10, 5),
(10, 9),
(10, 16),
(10, 23),
(17, 16),
(18, 16),
(19, 16),
(20, 16),
(21, 18),
(22, 18),
(23, 18),
(25, 18),
(26, 24),
(27, 24),
(28, 24),
(29, 15),
(30, 15),
(31, 25),
(36, 25),
(37, 25),
(38, 25),
(47, 4),
(47, 16),
(50, 17),
(50, 18),
(52, 10),
(54, 10),
(55, 10),
(56, 10),
(63, 24),
(64, 24),
(65, 4),
(65, 7),
(66, 4),
(66, 7);

-- --------------------------------------------------------

--
-- Table structure for table `choices`
--

CREATE TABLE `choices` (
  `ID` int(11) NOT NULL,
  `ISCORRECT` int(11) NOT NULL,
  `BODY` varchar(255) NOT NULL CHECK (octet_length(`BODY`) >= 2 and octet_length(`BODY`) <= 255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `choices`
--

INSERT INTO `choices` (`ID`, `ISCORRECT`, `BODY`) VALUES
(1, 0, 'no'),
(1, 0, 'yaaas'),
(1, 1, 'yeees'),
(2, 0, 'Fish'),
(2, 1, 'Meat'),
(2, 0, 'Poison'),
(3, 0, 'Cairo'),
(3, 1, 'Helsiniki'),
(3, 0, 'Newzland'),
(3, 0, 'Oslo'),
(4, 1, 'Beijing'),
(4, 0, 'Newzland'),
(4, 0, 'Sharm'),
(5, 0, 'Bejing'),
(5, 1, 'Canberra '),
(5, 0, 'Manofya'),
(5, 0, 'Oslo'),
(6, 0, 'Bejing'),
(6, 1, 'Brasalia'),
(6, 0, 'Oslo'),
(7, 1, ' Flutter is an open-source UI toolkit'),
(7, 0, 'Flutter is an open-source backend development framework'),
(7, 0, 'lutter is an open-source programming language for cross-platform applications'),
(8, 0, 'Facebook'),
(8, 1, 'Google'),
(8, 0, 'Microsoft'),
(9, 0, ' Java'),
(9, 1, 'Dart'),
(9, 0, 'Go'),
(9, 0, 'Kotlin'),
(10, 0, 'four'),
(10, 0, 'six'),
(10, 1, 'two'),
(11, 0, 'Being stressed'),
(11, 1, 'meaningful, satisfying work'),
(11, 0, 'Working only'),
(12, 1, 'existence'),
(12, 0, 'Helping'),
(13, 1, 'Distinguishing coherence'),
(13, 1, 'purpose'),
(13, 1, 'significance.'),
(14, 0, 'Authors can be the friends in your life you wish you had'),
(14, 1, 'Books change the conversation in your head.'),
(14, 1, 'Reading a lot ensures you have lots of good ideas.'),
(15, 0, 'to be lived'),
(15, 0, 'to be living'),
(15, 0, 'to have lived'),
(15, 1, 'to live'),
(16, 0, 'because'),
(16, 0, 'due'),
(16, 0, 'none'),
(16, 1, 'on account of'),
(16, 0, 'owing'),
(17, 0, 'had never said'),
(17, 0, 'have never said'),
(17, 1, 'never said'),
(17, 0, 'not having said'),
(18, 1, 'to be abducted'),
(18, 0, 'to be abducting'),
(18, 0, 'to have been abducted'),
(18, 0, 'to have been abducting'),
(19, 1, 'her'),
(19, 0, 'her own'),
(19, 0, 'hers'),
(19, 0, 'herself'),
(20, 1, 'Displays content at the bottom middle of the w3-display-container'),
(20, 0, 'Displays content at the bottom right corner of the w3-display-container'),
(20, 0, 'Displays content at the top middle of the w3-display-container'),
(21, 1, '<article>'),
(21, 0, '<green>'),
(21, 1, '<header>'),
(21, 0, '<hello>');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `ID` int(11) NOT NULL,
  `INSTRUCTORID` int(11) DEFAULT NULL,
  `INSTRUCTORFNAME` varchar(32) DEFAULT NULL CHECK (`INSTRUCTORFNAME`  not like '%[^a-zA-Z]%' and octet_length(`INSTRUCTORFNAME`) >= 3),
  `INSTRUCTORSNAME` varchar(32) DEFAULT NULL CHECK (`INSTRUCTORSNAME`  not like '%[^a-zA-Z]%' and octet_length(`INSTRUCTORSNAME`) >= 3),
  `PREREQUISITES` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`ID`, `INSTRUCTORID`, `INSTRUCTORFNAME`, `INSTRUCTORSNAME`, `PREREQUISITES`) VALUES
(2, 2, 'admin', 'aliaa', '[ ] react\r\n[ ] web'),
(15, 2, 'admin', 'aliaa', '- hate react\r\n\r\n- hate react\r\n\r\n- hate react'),
(39, 6, 'Menna', 'Ahmed', 'There are no formal prerequisites for learning HTML & CSS, but students should be comfortable using computers and navigating files and applications before learning coding skills.'),
(40, 6, 'Menna', 'Ahmed', 'There are no formal prerequisites for learning HTML & CSS, but students should be comfortable using computers and navigating files and applications before learning coding skills.'),
(41, 6, 'Menna', 'Ahmed', 'Windows setup: Install the Flutter SDK. 7m 19s.\r\nWindows setup: Install Android Studio. 2m 39s.\r\nWindows setup: Android Emulator. 5m 44s.'),
(42, 6, 'Menna', 'Ahmed', 'No prerequistes, Language learning is the process of learning to speak and understand a language, it helps children to acquire practical commands of language.'),
(43, 6, 'Menna', 'Ahmed', 'Basics of English'),
(46, 1, 'aliaa', 'gheis', '- hello world\r\n- internet\r\n- labtop'),
(53, 8, 'Ali', 'Sobhy', 'No prerequistes');

-- --------------------------------------------------------

--
-- Table structure for table `course_topic`
--

CREATE TABLE `course_topic` (
  `CID` int(11) NOT NULL,
  `TID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_topic`
--

INSERT INTO `course_topic` (`CID`, `TID`) VALUES
(2, 7),
(2, 15),
(2, 21),
(15, 9),
(15, 14),
(15, 15),
(39, 12),
(39, 16),
(40, 7),
(40, 16),
(41, 17),
(41, 18),
(42, 24),
(43, 10),
(43, 24),
(46, 12),
(46, 20),
(46, 21),
(46, 24),
(46, 25),
(53, 9),
(53, 10);

-- --------------------------------------------------------

--
-- Table structure for table `element`
--

CREATE TABLE `element` (
  `ID` int(11) NOT NULL,
  `CREATIONDATE` date DEFAULT current_timestamp(),
  `TITLE` varchar(50) NOT NULL CHECK (octet_length(`TITLE`) >= 2),
  `IMAGE` varchar(400) DEFAULT NULL,
  `DESCRIPTION` varchar(800) NOT NULL CHECK (octet_length(`DESCRIPTION`) >= 20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `element`
--

INSERT INTO `element` (`ID`, `CREATIONDATE`, `TITLE`, `IMAGE`, `DESCRIPTION`) VALUES
(1, '2022-12-22', 'love quite', 'https://images.unsplash.com/photo-1672218814630-97eb18814965?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'how to empassion quitness'),
(2, '2022-12-22', 'React Course', 'https://images.unsplash.com/photo-1672218814630-97eb18814965?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'learn react to hate your life'),
(3, '2022-12-22', 'aliaa gheis in admin ', 'https://images.unsplash.com/photo-1672218814630-97eb18814965?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'How React Killed me ??'),
(4, '2022-12-22', 'welcom home', 'https://images.unsplash.com/photo-1672218814630-97eb18814965?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'this call from proc this call from pro'),
(5, '2022-12-22', 'welcom home', 'https://images.unsplash.com/photo-1664574654578-d5a6a4f447bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'this call from proc this call from pro'),
(6, '2022-12-22', 'welcom home', 'https://images.unsplash.com/photo-1672162723391-9fd523f02f69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80', 'this call from proc this call from pro'),
(7, '2022-12-22', 'hello world', 'http://localhost:4000/images/5b6ff5fe09448c675eaabe2ef7ad826b', 'this \'s how i greet world in my village'),
(8, '2022-12-22', 'from nodejs from proc', 'https://images.unsplash.com/photo-1672162723391-9fd523f02f69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80', 'small summary on miserable how i am'),
(9, '2022-12-22', 'title titlke', 'https://images.unsplash.com/photo-1664575601711-67110e027b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'coool oasd jsdopjasd'),
(10, '2022-12-22', 'title title', 'http://localhost:4000/images/385b9f6e67b3b7acf20cadb2b6cac1fc', 'my life was wasted on react'),
(11, '2022-12-22', 'here we go again', 'http://localhost:4000/images/4.jpg', 'test test please test'),
(12, '2022-12-22', 'here we go again', 'http://localhost:4000/images/4.jpg', 'test test please test'),
(13, '2022-12-22', 'here we go again', 'http://localhost:4000/images/4.jpg', 'test test please test'),
(14, '2022-12-22', 'here we go again', 'https://images.unsplash.com/photo-1664575601711-67110e027b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'test test please test'),
(15, '2022-12-22', 'hello world by react', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'my life was wasted on react'),
(16, '2022-12-22', 'hello me', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'for test trigges in mysql'),
(17, '2022-12-28', 'React-How-to', 'http://localhost:4000/images/385b9f6e67b3b7acf20cadb2b6cac1fc', 'Pete Hunt’s guide to the React ecosystem.'),
(18, '2022-12-28', 'You\'re missing the point of react', 'http://localhost:4000/images/385b9f6e67b3b7acf20cadb2b6cac1fc', 'Dan Abramov’s article about the best parts of React.'),
(19, '2022-12-28', 'Thinking in react hooks', 'http://localhost:4000/images/385b9f6e67b3b7acf20cadb2b6cac1fc', 'Amelia Wattenberger’s provides visualizations and highlighting the mindset change needed switching from classes to functional components + hooks.'),
(20, '2022-12-28', 'React/Redux links', 'https://images.unsplash.com/photo-1671975961801-316a3b10df0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80', 'Curated tutorial and resource links by Mark Erikson collected on React, Redux, ES6, and more. Very helpful for all kind of developers because of it’s categorised content.'),
(21, '2022-12-28', 'Dart&flutter course1', 'http://localhost:4000/images/385b9f6e67b3b7acf20cadb2b6cac1fc', 'Dart & Flutter with ChatGPT: Is it worth it?'),
(22, '2022-12-28', 'Dart&flutter course2', 'https://images.unsplash.com/photo-1664575601711-67110e027b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'Riverpod Data Caching and Providers Lifecycle: Full Guide'),
(23, '2022-12-28', 'Dart&flutter course3', 'https://images.unsplash.com/photo-1671975961801-316a3b10df0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80', 'How to Unit Test AsyncNotifier Subclasses with Riverpod 2.0 in Flutter'),
(24, '2022-12-28', 'Dart&flutter course4', 'https://images.unsplash.com/photo-1672162723391-9fd523f02f69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80', 'How to use Notifier and AsyncNotifier with the new Flutter Riverpod Generator'),
(25, '2022-12-28', 'Dart&flutter course5', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'Flutter Bottom Navigation Bar with Nested Routes: GoRouter vs Beamer Comparison'),
(26, '2022-12-28', 'English Level1', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'Setting language learning goals for the new year? Here’s what to do'),
(27, '2022-12-28', 'English Level2', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'How to talk about tech problems and solutions'),
(28, '2022-12-28', 'English Level3', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'Parenting a toddler when English is your second language\r\nABC Everyday / By Angie Cui'),
(29, '2022-12-28', 'nodejs lesson1', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'An overview of Node.js: architecture, APIs, event loop, concurrency'),
(30, '2022-12-28', 'nodejs lesson2', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'How To Set Up a GraphQL API Server in Node.js'),
(31, '2022-12-28', 'AI intro', 'https://images.unsplash.com/photo-1489914099268-1dad649f76bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'What is Artificial Intelligence: Types, History, and Future'),
(36, '2022-12-28', 'AI history', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'Artificial Intelligence History'),
(37, '2022-12-28', 'basics of AI', 'https://images.unsplash.com/photo-1489914099268-1dad649f76bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'ARTIFICIAL INTELLIGENCE DEFINITION: BASICS OF AI'),
(38, '2022-12-28', 'Future of AI', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'The Future of Artificial Intelligence'),
(39, '2022-12-28', 'HTML Course', 'http://localhost:4000/images/4.jpg', 'This course is concerning the basics of html which you need to build up a website.'),
(40, '2022-12-28', 'CSS Course', 'https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'It`s an intro course in the field of web styling'),
(41, '2022-12-28', 'Flutter Course', 'http://localhost:4000/images/4.jpg', 'It`s an intro course in the field of mobile app development'),
(42, '2022-12-28', 'English Course Level1', 'http://localhost:4000/images/4.jpg', 'It`s an intro course for learning english.'),
(43, '2022-12-28', 'Advanced English Course', 'http://localhost:4000/images/4.jpg', 'It`s a course for whom want to be advance his skills in English.'),
(44, '2022-12-28', 'coool soo cool', 'http://localhost:4000/images/61c621d169f139fc3e77200fb3c38614', 'hell kill me twice so i came back'),
(45, '2022-12-28', 'aliaa gheis is awesome', 'http://localhost:4000/images/ff657387d4be34315a0edf39130bd2a9', 'How React Killed me ??'),
(46, '2022-12-28', 'cool soo cool me cool', 'http://localhost:4000/images/4.jpg', 'my life was wasted on react'),
(47, '2022-12-28', 'hello react', 'http://localhost:4000/images/4.jpg', 'Hello React World,dear'),
(48, '2022-12-28', 'Most Liked food', 'http://localhost:4000/images/4.jpg', 'What food is most likely?'),
(49, '2022-12-28', 'Capitals Quiz', 'http://localhost:4000/images/4.jpg', 'IT`s a quiz about capitals over the world'),
(50, '2022-12-28', 'Flutter Article', 'http://localhost:4000/images/4.jpg', 'Dart & Flutter with ChatGPT: Is it worth it?'),
(51, '2022-12-28', 'Flutter Quiz', 'http://localhost:4000/images/4.jpg', 'It`s just a quiz about flutter basics'),
(52, '2022-12-28', 'Life Lessons', 'http://localhost:4000/images/4.jpg', 'Most Books Won’t Change Your Life (But You Should Read Them Anyways)'),
(53, '2022-12-28', 'How to deal with life', 'http://localhost:4000/images/4.jpg', 'This course is prettys imple,it aims to facilitate our lives'),
(54, '2022-12-28', 'Life Lesson2', 'http://localhost:4000/images/4.jpg', 'Why You Ought to Read More Advice than You Actually Use'),
(55, '2022-12-28', 'Life Lesson3', 'http://localhost:4000/images/4.jpg', 'If the Typical Book Changes Your Life You Read Far Too Few Books'),
(56, '2022-12-28', 'Life Lesson4', 'http://localhost:4000/images/4.jpg', 'Why Unused Books Still Have Value'),
(57, '2022-12-28', 'LifeLesson2', 'http://localhost:4000/images/4.jpg', 'Quiz on life lesson2'),
(58, '2022-12-28', 'Life Lesson4', 'http://localhost:4000/images/4.jpg', 'Quiz on life lesson4'),
(59, '2022-12-28', 'LifeLesson1', 'http://localhost:4000/images/4.jpg', 'Quiz on life lesson1'),
(60, '2022-12-28', 'Lesson1', 'http://localhost:4000/images/4.jpg', 'Quiz on first Lesson'),
(61, '2022-12-28', 'Lesson2', 'http://localhost:4000/images/4.jpg', 'Quiz on second Lesson'),
(62, '2022-12-28', 'Lesson3', 'http://localhost:4000/images/4.jpg', 'Quiz on third Lesson'),
(63, '2022-12-28', 'English Lesson1', 'http://localhost:4000/images/4.jpg', 'Setting language learning goals for the new year? Here’s what to do'),
(64, '2022-12-28', 'English Lesson2', 'http://localhost:4000/images/4.jpg', 'How to talk about tech problems and solutions'),
(65, '2022-12-28', 'CSS lesson1', 'http://localhost:4000/images/4.jpg', 'W3.CSS Containers l1'),
(66, '2022-12-28', 'CSS Lesson2', 'http://localhost:4000/images/4.jpg', 'W3.CSS Display       '),
(67, '2022-12-28', 'CSS Quiz1', 'http://localhost:4000/images/4.jpg', 'CSS Quiz1                   '),
(68, '2022-12-28', 'CSS Quiz2', 'http://localhost:4000/images/4.jpg', 'CSS Quiz2             ');

-- --------------------------------------------------------

--
-- Table structure for table `enroll`
--

CREATE TABLE `enroll` (
  `STARTDATE` datetime DEFAULT current_timestamp(),
  `REVIEWBODY` varchar(256) DEFAULT NULL,
  `REVIEWRATING` int(11) DEFAULT NULL CHECK (`REVIEWRATING` >= 0 and `REVIEWRATING` <= 5),
  `SID` int(11) NOT NULL,
  `CID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enroll`
--

INSERT INTO `enroll` (`STARTDATE`, `REVIEWBODY`, `REVIEWRATING`, `SID`, `CID`) VALUES
('2022-12-22 05:38:23', NULL, NULL, 1, 2),
('2022-12-22 04:39:53', 'worst', 2, 2, 2),
('2022-12-28 21:16:20', NULL, NULL, 6, 2),
('2022-12-28 21:16:35', NULL, NULL, 6, 46),
('2022-12-28 19:17:52', NULL, NULL, 7, 40),
('2022-12-28 19:18:25', NULL, NULL, 7, 41),
('2022-12-28 19:21:37', NULL, NULL, 7, 43),
('2022-12-28 19:22:15', NULL, NULL, 7, 46),
('2022-12-28 19:29:37', NULL, NULL, 8, 40),
('2022-12-28 19:29:53', NULL, NULL, 8, 41),
('2022-12-28 19:30:16', NULL, NULL, 8, 42),
('2022-12-28 19:29:48', NULL, NULL, 8, 43),
('2022-12-28 20:18:53', NULL, NULL, 8, 46),
('2022-12-28 20:39:36', NULL, NULL, 9, 2),
('2022-12-28 20:39:40', NULL, NULL, 9, 15),
('2022-12-28 20:40:04', NULL, NULL, 9, 39),
('2022-12-28 20:39:46', NULL, NULL, 9, 40),
('2022-12-28 20:40:01', NULL, NULL, 9, 41),
('2022-12-28 20:39:52', NULL, NULL, 9, 42),
('2022-12-28 20:39:43', NULL, NULL, 9, 43),
('2022-12-28 20:39:49', NULL, NULL, 9, 46),
('2022-12-28 20:40:16', NULL, NULL, 9, 53),
('2022-12-28 20:53:16', NULL, NULL, 10, 2),
('2022-12-28 20:53:24', NULL, NULL, 10, 41),
('2022-12-28 21:00:03', NULL, NULL, 11, 2),
('2022-12-28 21:00:40', NULL, NULL, 11, 40),
('2022-12-28 21:00:08', NULL, NULL, 11, 41),
('2022-12-28 21:00:14', NULL, NULL, 11, 43),
('2022-12-28 21:00:21', NULL, NULL, 11, 46),
('2022-12-28 21:00:35', NULL, NULL, 11, 53),
('2022-12-29 09:49:43', NULL, NULL, 12, 2),
('2022-12-29 09:50:41', NULL, NULL, 12, 41),
('2022-12-29 09:51:56', NULL, NULL, 13, 41);

--
-- Triggers `enroll`
--
DELIMITER $$
CREATE TRIGGER `review` AFTER UPDATE ON `enroll` FOR EACH ROW BEGIN
    IF OLD.REVIEWBODY <> NEW.REVIEWBODY THEN
        UPDATE INSTRUCTOR
        SET RATING=RATING+(NEW.REVIEWRATING-OLD.REVIEWRATING)*10
        WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM COURSE WHERE ID=NEW.CID);
    ELSEIF OLD.REVIEWBODY IS NULL THEN
        UPDATE INSTRUCTOR
        SET RATING=RATING+NEW.REVIEWRATING*10
        WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM COURSE WHERE ID=NEW.CID);        
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `instructor`
--

CREATE TABLE `instructor` (
  `ID` int(11) NOT NULL,
  `RATING` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructor`
--

INSERT INTO `instructor` (`ID`, `RATING`) VALUES
(1, 2250),
(2, 10200),
(3, 400),
(4, 5300),
(6, 3000),
(8, 2100);

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `LID` int(11) NOT NULL,
  `NAME` varchar(32) DEFAULT NULL CHECK (`NAME`  not like '%[^a-zA-Z]%' and octet_length(`NAME`) >= 1),
  `DESCRIPTION` varchar(256) DEFAULT NULL CHECK (`DESCRIPTION`  not like '%[^a-zA-Z]%' and octet_length(`DESCRIPTION`) >= 1),
  `CID` int(11) NOT NULL,
  `QID` int(11) NOT NULL,
  `AID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`LID`, `NAME`, `DESCRIPTION`, `CID`, `QID`, `AID`) VALUES
(11, 'lesson 1', 'here is what we do', 46, 45, 18),
(12, 'Intro', 'This is the hello world to flutter', 41, 51, 50),
(13, 'Lesson1', 'First Lesson', 53, 57, 54),
(15, 'Lesson2', 'Second Lesson', 53, 58, 56),
(16, 'Lesson1', 'First Lesson', 42, 60, 63),
(17, 'Lesson2', 'Second Lesson', 42, 61, 64),
(18, 'Lesson3', 'Third Lesson', 42, 62, 64),
(19, 'Lesson1', 'First Lesson', 40, 67, 65),
(20, 'Lesson2', 'Second Lesson', 40, 68, 66);

-- --------------------------------------------------------

--
-- Table structure for table `likeonarticle`
--

CREATE TABLE `likeonarticle` (
  `UID` int(11) NOT NULL,
  `AID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likeonarticle`
--

INSERT INTO `likeonarticle` (`UID`, `AID`) VALUES
(1, 1),
(1, 4),
(1, 5),
(1, 6),
(1, 8),
(6, 1),
(6, 4),
(6, 6),
(6, 8),
(6, 21),
(6, 27),
(6, 28),
(6, 31),
(6, 37),
(6, 38),
(7, 1),
(7, 4),
(7, 5),
(7, 7),
(7, 9),
(7, 10),
(7, 12),
(7, 28),
(7, 29),
(7, 36),
(7, 37),
(7, 38),
(7, 47),
(7, 50),
(8, 1),
(8, 4),
(8, 30),
(8, 31),
(8, 36),
(8, 37),
(8, 38),
(8, 47),
(8, 50),
(9, 1),
(9, 6),
(9, 21),
(9, 24),
(9, 30),
(9, 36),
(9, 37),
(9, 38),
(9, 47),
(9, 50),
(9, 55),
(10, 1),
(10, 28),
(10, 30),
(10, 31),
(10, 36),
(10, 37),
(10, 38),
(10, 47),
(10, 50),
(10, 52),
(10, 55),
(10, 56),
(11, 1),
(11, 31),
(11, 37),
(11, 38),
(11, 47),
(11, 50),
(11, 55),
(11, 56),
(12, 1),
(12, 4),
(12, 11),
(12, 27);

--
-- Triggers `likeonarticle`
--
DELIMITER $$
CREATE TRIGGER `dislike_article` AFTER DELETE ON `likeonarticle` FOR EACH ROW BEGIN
    UPDATE INSTRUCTOR
    SET RATING=RATING-100
    WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM ARTICLE WHERE ID=OLD.AID);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `like_article` AFTER INSERT ON `likeonarticle` FOR EACH ROW BEGIN
    UPDATE INSTRUCTOR
    SET RATING=RATING+100
    WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM ARTICLE WHERE ID=NEW.AID);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `likeoncomment`
--

CREATE TABLE `likeoncomment` (
  `UID` int(11) NOT NULL,
  `CID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likeoncomment`
--

INSERT INTO `likeoncomment` (`UID`, `CID`) VALUES
(12, 1),
(12, 2),
(12, 11),
(12, 37),
(12, 60);

--
-- Triggers `likeoncomment`
--
DELIMITER $$
CREATE TRIGGER `dislike_comment` AFTER DELETE ON `likeoncomment` FOR EACH ROW BEGIN
    UPDATE STUDENT
    SET SCORE=SCORE-10
    WHERE STUDENT.ID IN (SELECT UID FROM _COMMENT WHERE ID=OLD.CID);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `like_comment` AFTER INSERT ON `likeoncomment` FOR EACH ROW BEGIN
    UPDATE STUDENT
    SET SCORE=SCORE+10
    WHERE STUDENT.ID IN (SELECT UID FROM _COMMENT WHERE ID=NEW.CID);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `MID` int(11) NOT NULL,
  `SENDDATETIME` datetime DEFAULT current_timestamp(),
  `TXT` varchar(256) NOT NULL CHECK (octet_length(`TXT`) >= 1),
  `SENDER` varchar(20) NOT NULL CHECK (octet_length(`SENDER`) >= 3),
  `CID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`MID`, `SENDDATETIME`, `TXT`, `SENDER`, `CID`) VALUES
(1, '2022-12-28 19:21:44', 'hi', 'Samy6', 43),
(2, '2022-12-28 19:21:49', 'how are you', 'Samy6', 43),
(3, '2022-12-29 09:50:48', 'hello', 'ahmedr2001', 41),
(4, '2022-12-29 09:52:01', 'hi', 'moh', 41),
(5, '2022-12-29 11:55:21', 'jhbkl', 'ahmedr2001', 2);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `ID` int(11) NOT NULL,
  `SCORE` int(11) NOT NULL,
  `BODY` mediumtext NOT NULL CHECK (octet_length(`BODY`) >= 10),
  `INSTRUCTORID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`ID`, `SCORE`, `BODY`, `INSTRUCTORID`) VALUES
(1, 50, 'hello world ???', 1),
(2, 4, 'What is the most likely food?', 6),
(3, 2, 'What is the capital of Finland?\n', 6),
(4, 3, 'What is the capital of China?', 6),
(5, 2, 'What is the capital of Australia?', 6),
(6, 1, 'What is the capital of Brazil?', 6),
(7, 2, 'What is Flutter?', 6),
(8, 2, 'Who developed the Flutter Framework and continues to maintain it today?', 6),
(9, 2, 'Which programming language is used to build Flutter applications?\n', 6),
(10, 1, 'How many types of widgets are there in Flutter?', 8),
(11, 2, 'What`s the purpose of life?', 8),
(12, 1, 'What`s the meaning of life?', 8),
(13, 2, 'Choose The three meanings of meaning in life', 8),
(14, 2, 'Why Unused Books Still Have Value', 8),
(15, 2, 'I`m very happy _____ in India. I really miss being there.', 6),
(16, 2, 'They didn`t reach an agreement ______ their differences.', 6),
(17, 1, 'I wish I _____ those words. But now it`s too late.', 6),
(18, 2, 'The woman, who has been missing for 10 days, is believed ____', 6),
(19, 3, 'She was working on her computer with her baby next to _____.', 6),
(20, 1, 'What does this mean w3-display-bottommiddle', 6),
(21, 3, 'w3-container class is typically used with HTML container elements, like:', 6);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `ID` int(11) NOT NULL,
  `MAXSCORE` int(11) NOT NULL,
  `INSTRUCTORID` int(11) DEFAULT NULL,
  `INSTRUCTORFNAME` varchar(32) DEFAULT NULL CHECK (`INSTRUCTORFNAME`  not like '%[^a-zA-Z]%' and octet_length(`INSTRUCTORFNAME`) >= 3),
  `INSTRUCTORSNAME` varchar(32) DEFAULT NULL CHECK (`INSTRUCTORSNAME`  not like '%[^a-zA-Z]%' and octet_length(`INSTRUCTORSNAME`) >= 3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`ID`, `MAXSCORE`, `INSTRUCTORID`, `INSTRUCTORFNAME`, `INSTRUCTORSNAME`) VALUES
(45, 100, 1, 'aliaa', 'gheis'),
(48, 100, 6, 'Menna', 'Ahmed'),
(49, 100, 6, 'Menna', 'Ahmed'),
(51, 100, 6, 'Menna', 'Ahmed'),
(57, 100, 8, 'Ali', 'Sobhy'),
(58, 100, 8, 'Ali', 'Sobhy'),
(59, 100, 8, 'Ali', 'Sobhy'),
(60, 100, 6, 'Menna', 'Ahmed'),
(61, 100, 6, 'Menna', 'Ahmed'),
(62, 100, 6, 'Menna', 'Ahmed'),
(67, 100, 6, 'Menna', 'Ahmed'),
(68, 100, 6, 'Menna', 'Ahmed');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_question_topic`
--

CREATE TABLE `quiz_question_topic` (
  `QID` int(11) NOT NULL,
  `NID` int(11) NOT NULL,
  `TID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_question_topic`
--

INSERT INTO `quiz_question_topic` (`QID`, `NID`, `TID`) VALUES
(45, 1, 7),
(45, 1, 18),
(45, 1, 21),
(45, 1, 25),
(48, 2, 9),
(49, 3, 10),
(49, 3, 11),
(49, 4, 10),
(49, 4, 11),
(49, 5, 10),
(49, 5, 11),
(49, 6, 10),
(49, 6, 11),
(51, 7, 17),
(51, 7, 18),
(51, 8, 17),
(51, 8, 18),
(51, 9, 17),
(51, 9, 18),
(57, 11, 10),
(57, 12, 10),
(58, 13, 10),
(58, 14, 10),
(59, 11, 2),
(59, 11, 10),
(60, 15, 24),
(60, 16, 24),
(61, 16, 24),
(61, 18, 24),
(61, 19, 24),
(62, 15, 24),
(62, 16, 24),
(62, 17, 24),
(67, 20, 4),
(67, 20, 7),
(67, 21, 4),
(67, 21, 7),
(68, 20, 4),
(68, 20, 7);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_topic`
--

CREATE TABLE `quiz_topic` (
  `QID` int(11) NOT NULL,
  `TID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `readarticle`
--

CREATE TABLE `readarticle` (
  `SID` int(11) NOT NULL,
  `AID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `readarticle`
--

INSERT INTO `readarticle` (`SID`, `AID`) VALUES
(1, 1),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 17),
(1, 18),
(1, 20),
(1, 22),
(1, 25),
(1, 26),
(1, 27),
(1, 38),
(2, 1),
(2, 10),
(3, 9),
(6, 1),
(6, 4),
(6, 6),
(6, 8),
(6, 21),
(6, 26),
(6, 27),
(6, 28),
(6, 31),
(6, 37),
(6, 38),
(7, 1),
(7, 4),
(7, 5),
(7, 6),
(7, 7),
(7, 9),
(7, 10),
(7, 11),
(7, 12),
(7, 18),
(7, 28),
(7, 29),
(7, 30),
(7, 36),
(7, 37),
(7, 38),
(7, 47),
(7, 50),
(8, 1),
(8, 4),
(8, 30),
(8, 31),
(8, 36),
(8, 37),
(8, 38),
(8, 47),
(8, 50),
(8, 54),
(8, 55),
(9, 1),
(9, 6),
(9, 21),
(9, 24),
(9, 30),
(9, 36),
(9, 37),
(9, 38),
(9, 47),
(9, 50),
(9, 55),
(9, 56),
(10, 1),
(10, 28),
(10, 30),
(10, 31),
(10, 36),
(10, 37),
(10, 38),
(10, 47),
(10, 50),
(10, 52),
(10, 55),
(10, 56),
(11, 1),
(11, 31),
(11, 37),
(11, 38),
(11, 47),
(11, 50),
(11, 55),
(11, 56),
(12, 1),
(12, 4);

--
-- Triggers `readarticle`
--
DELIMITER $$
CREATE TRIGGER `read_article` AFTER INSERT ON `readarticle` FOR EACH ROW BEGIN
    UPDATE STUDENT
    SET SCORE=SCORE+25
    WHERE STUDENT.ID=NEW.SID;

    UPDATE INSTRUCTOR
    SET RATING=RATING+50
    WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM ARTICLE WHERE ID=NEW.AID);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `ID` int(11) NOT NULL,
  `SCORE` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`ID`, `SCORE`) VALUES
(1, 825),
(2, 110),
(3, 50),
(5, 0),
(6, 560),
(7, 910),
(8, 670),
(9, 636),
(10, 638),
(11, 436),
(12, 51),
(13, 0);

-- --------------------------------------------------------

--
-- Table structure for table `studenttakesquiz`
--

CREATE TABLE `studenttakesquiz` (
  `QID` int(11) NOT NULL,
  `SID` int(11) NOT NULL,
  `SCORE` int(11) NOT NULL,
  `TAKEDATE` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studenttakesquiz`
--

INSERT INTO `studenttakesquiz` (`QID`, `SID`, `SCORE`, `TAKEDATE`) VALUES
(45, 8, 50, '2022-12-28'),
(48, 8, 4, '2022-12-28'),
(48, 9, 4, '2022-12-28'),
(48, 10, 4, '2022-12-28'),
(49, 10, 7, '2022-12-28'),
(49, 11, 8, '2022-12-28'),
(51, 8, 6, '2022-12-28'),
(51, 10, 6, '2022-12-28'),
(51, 11, 2, '2022-12-28'),
(57, 9, 3, '2022-12-28'),
(57, 11, 3, '2022-12-28'),
(57, 12, 1, '2022-12-29'),
(58, 9, 4, '2022-12-28'),
(59, 9, 2, '2022-12-28'),
(59, 10, 2, '2022-12-28');

--
-- Triggers `studenttakesquiz`
--
DELIMITER $$
CREATE TRIGGER `student_takes_quiz` AFTER INSERT ON `studenttakesquiz` FOR EACH ROW BEGIN
    UPDATE STUDENT
    SET SCORE=SCORE+NEW.SCORE
    WHERE STUDENT.ID=NEW.SID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(30) NOT NULL CHECK (octet_length(`NAME`) >= 2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`ID`, `NAME`) VALUES
(8, 'all'),
(25, 'artificial intelligence'),
(15, 'back'),
(19, 'bad'),
(23, 'college'),
(1, 'cool'),
(7, 'css'),
(21, 'database'),
(14, 'dev'),
(5, 'django'),
(24, 'English'),
(18, 'flutter'),
(16, 'front'),
(9, 'good'),
(12, 'html'),
(10, 'life'),
(17, 'mobile'),
(11, 'modern'),
(6, 'python'),
(20, 'sad'),
(22, 'sections'),
(2, 'stuff'),
(3, 'themes'),
(4, 'web');

-- --------------------------------------------------------

--
-- Table structure for table `_comment`
--

CREATE TABLE `_comment` (
  `ID` int(11) NOT NULL,
  `AID` int(11) NOT NULL,
  `RID` int(11) DEFAULT NULL,
  `UID` int(11) NOT NULL,
  `CREATIONDATENTIME` datetime DEFAULT current_timestamp(),
  `BODY` varchar(1000) NOT NULL CHECK (octet_length(`BODY`) > 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_comment`
--

INSERT INTO `_comment` (`ID`, `AID`, `RID`, `UID`, `CREATIONDATENTIME`, `BODY`) VALUES
(1, 1, NULL, 2, '2022-12-22 15:02:19', 'hello world'),
(2, 1, NULL, 6, '2022-12-28 18:33:07', 'I think that this article is pretty good'),
(3, 4, NULL, 6, '2022-12-28 18:33:31', 'Great article'),
(4, 6, NULL, 6, '2022-12-28 18:33:48', 'I liked that so much.'),
(5, 8, NULL, 6, '2022-12-28 18:34:00', 'pretty cool'),
(6, 27, NULL, 6, '2022-12-28 18:34:14', 'I liked that too much'),
(7, 28, NULL, 6, '2022-12-28 18:34:31', 'I found that so benefcial'),
(8, 21, NULL, 6, '2022-12-28 18:34:49', 'This article helped me alot'),
(9, 38, NULL, 6, '2022-12-28 18:35:24', 'I am really interseted about this field'),
(10, 31, NULL, 6, '2022-12-28 19:06:02', 'It sounds good'),
(11, 1, NULL, 7, '2022-12-28 19:09:37', 'Pretty good'),
(12, 12, NULL, 7, '2022-12-28 19:10:31', 'Good job'),
(13, 7, NULL, 7, '2022-12-28 19:10:54', 'Ohh ,that`s really great'),
(14, 4, NULL, 7, '2022-12-28 19:11:10', 'I liked it '),
(15, 29, NULL, 7, '2022-12-28 19:11:26', 'that`s fantastic'),
(16, 5, NULL, 7, '2022-12-28 19:11:37', 'Good article'),
(17, 6, NULL, 7, '2022-12-28 19:12:02', 'You are right react is hard'),
(18, 9, NULL, 7, '2022-12-28 19:12:25', 'Never mind.'),
(19, 10, NULL, 7, '2022-12-28 19:12:45', 'Oh what`s the content'),
(20, 50, NULL, 7, '2022-12-28 19:13:05', 'So good'),
(21, 47, NULL, 7, '2022-12-28 19:13:30', 'I am so excited to see more from your articles'),
(22, 38, NULL, 7, '2022-12-28 19:13:43', 'This is so intersting'),
(23, 36, NULL, 7, '2022-12-28 19:13:59', 'Oh, I found that amazing'),
(24, 30, NULL, 7, '2022-12-28 19:14:18', 'I didn`t enjoy it at all.'),
(25, 28, NULL, 7, '2022-12-28 19:15:07', 'That`s very helpful'),
(26, 37, NULL, 7, '2022-12-28 19:23:13', 'That sounds good'),
(27, 4, 14, 8, '2022-12-28 19:25:20', 'I liked it too'),
(28, 4, NULL, 8, '2022-12-28 19:25:29', 'Amazing'),
(29, 50, NULL, 8, '2022-12-28 19:25:55', 'That`s very helpful'),
(30, 38, NULL, 8, '2022-12-28 19:26:13', 'Oh, I found that amazing'),
(31, 38, NULL, 8, '2022-12-28 19:26:56', 'Oh, I found that amazing'),
(32, 47, NULL, 8, '2022-12-28 19:37:10', 'I liked that so much.'),
(33, 37, NULL, 8, '2022-12-28 19:37:46', 'That`s very good'),
(34, 31, NULL, 8, '2022-12-28 19:38:14', 'Great article'),
(35, 30, NULL, 8, '2022-12-28 19:38:38', 'I liked that so much.'),
(36, 36, NULL, 8, '2022-12-28 19:39:24', 'Amazing'),
(37, 1, NULL, 9, '2022-12-28 20:37:01', 'Good job'),
(38, 38, NULL, 9, '2022-12-28 20:37:14', 'Doing Great'),
(39, 37, NULL, 9, '2022-12-28 20:37:33', 'I am interseted'),
(40, 55, NULL, 9, '2022-12-28 20:37:48', 'I liked that so  much'),
(41, 47, NULL, 9, '2022-12-28 20:37:59', 'Prettu good'),
(42, 50, NULL, 9, '2022-12-28 20:38:19', 'That`s great'),
(43, 36, NULL, 9, '2022-12-28 20:38:36', 'Ohh, great'),
(44, 36, NULL, 9, '2022-12-28 20:38:38', 'Ohh, grea'),
(45, 30, NULL, 9, '2022-12-28 20:39:07', 'Oh, I found that amazing'),
(46, 21, NULL, 9, '2022-12-28 20:39:18', 'Amazing'),
(47, 6, NULL, 9, '2022-12-28 20:42:16', 'Great article'),
(48, 24, NULL, 9, '2022-12-28 20:42:32', 'That sounds great'),
(49, 47, NULL, 10, '2022-12-28 20:48:38', 'Great article'),
(50, 50, NULL, 10, '2022-12-28 20:48:49', 'I liked that so much.'),
(51, 38, NULL, 10, '2022-12-28 20:49:10', 'I liked that so much.'),
(52, 37, NULL, 10, '2022-12-28 20:49:27', 'Ohh, Good'),
(53, 55, NULL, 10, '2022-12-28 20:49:53', 'I loved it'),
(54, 31, NULL, 10, '2022-12-28 20:50:06', 'I loved it'),
(55, 36, NULL, 10, '2022-12-28 20:50:23', 'that`s fantastic'),
(56, 52, NULL, 10, '2022-12-28 20:50:41', 'that helped me alot'),
(57, 30, NULL, 10, '2022-12-28 20:51:01', 'Great article'),
(58, 28, NULL, 10, '2022-12-28 20:51:38', 'I love dit'),
(59, 28, NULL, 10, '2022-12-28 20:51:41', 'I loved it'),
(60, 1, NULL, 11, '2022-12-28 20:57:51', 'I loved it'),
(61, 37, NULL, 11, '2022-12-28 20:58:03', 'Wow that`s good'),
(62, 38, NULL, 11, '2022-12-28 20:58:19', 'Amazing'),
(63, 50, NULL, 11, '2022-12-28 20:58:34', 'that helped me alot'),
(64, 56, NULL, 11, '2022-12-28 20:58:53', 'Life is better with good people'),
(65, 47, NULL, 11, '2022-12-28 20:59:20', 'React is pretty simple'),
(66, 55, NULL, 11, '2022-12-28 20:59:34', 'Great article'),
(67, 31, NULL, 11, '2022-12-28 20:59:57', 'that`s fantastic'),
(68, 4, NULL, 12, '2022-12-29 11:55:43', 'VERY BAD ARTICLE!!!!!!!!!');

-- --------------------------------------------------------

--
-- Table structure for table `_user`
--

CREATE TABLE `_user` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(20) NOT NULL CHECK (octet_length(`USERNAME`) >= 3),
  `FNAME` varchar(32) NOT NULL CHECK (`FNAME`  not like '%[^a-zA-Z]%' and octet_length(`FNAME`) >= 3),
  `SNAME` varchar(32) NOT NULL CHECK (`SNAME`  not like '%[^a-zA-Z]%' and octet_length(`SNAME`) >= 3),
  `EMAIL` varchar(32) NOT NULL CHECK (`EMAIL` like '%@%.%'),
  `JOINDATE` date DEFAULT current_timestamp(),
  `ABOUT` mediumtext DEFAULT NULL,
  `ISADMIN` bit(1) NOT NULL DEFAULT b'0',
  `_PASSWORD` varchar(60) NOT NULL,
  `_IMAGE` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_user`
--

INSERT INTO `_user` (`ID`, `USERNAME`, `FNAME`, `SNAME`, `EMAIL`, `JOINDATE`, `ABOUT`, `ISADMIN`, `_PASSWORD`, `_IMAGE`) VALUES
(1, 'aliaagheis', 'aliaa', 'gheis', 'aliaagheis@gmail.com', '2022-12-22', 'passionate front web developer', b'0', '$2a$10$e552Q1pn.kDGz2jy6/lRtezvv.cJzmlpkzChW..8WA5QszyTwVqbW', 'http://localhost:4000/images/2f75a1b7184928f87693872c1bfea652'),
(2, 'admin', 'admin', 'aliaa', 'admin@admin.com', '2022-12-22', 'so adminic', b'1', '$2a$10$ok/G50rBVkY7ky0KdBRA1eU5iNtoqr7Yz9UmOTQRjLp1lZYzKBvai', 'http://localhost:4000/images/3e4f15f4c2e60aae5fa07e2776cce812'),
(3, 'aliaagheis1', 'aliaa', 'testsme', 'aliaagheis1@gmail.com', '2022-12-22', NULL, b'0', '$2a$10$MZFLsL99vOaAzoBguK0c0uQBLYYJJnz9oKYlku53aDhraU3vzYqJe', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(4, 'menna17', 'menna', 'ahmed', 'menna@gmail.com', '2022-12-28', NULL, b'1', '0000000000000001111', NULL),
(5, 'menna99', 'Menna', 'Ahmed', 'mennaahmed0701@gmail.com', '2022-12-28', NULL, b'0', '$2a$10$X3ESvgWpXwALhhbvqhYwJ.OmOknkE/ionPxnUr3GNj6pCvFFBgmge', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(6, 'menna99999', 'Menna', 'Ahmed', 'mennaahmed001@gmail.com', '2022-12-28', NULL, b'0', '$2a$10$6CrpY/qQzYWjExNihvlLR.zZne1SpXoaWaIwNXkicBH4js8KoObe2', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(7, 'Samy6', 'Samy', 'Ahmed', 'Samy6@gmail.com', '2022-12-28', NULL, b'0', '$2a$10$SmYXR/WA7H8TPeSj5LpGeuitgTN9u4CeS1JlOsVfTh1V0Quyzfx02', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(8, 'Ali9', 'Ali', 'Sobhy', 'Ali9@gmail.com', '2022-12-28', NULL, b'0', '$2a$10$aBmlCOA8Enr9qursJbY2jenelVhMHooAPlbmGnauLoJuw3RpMSL2G', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(9, 'Fatma7', 'Fatma', 'Ali', 'Fatma7@gmail.com', '2022-12-28', NULL, b'0', '$2a$10$PquETuXV454y1jGdCWGEaOxNBrdb6TGqEKfXHov11wW2/Wq3e1JXK', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(10, 'Mazen9', 'Mazen', 'Mohsen', 'Mazen9@gmail.com', '2022-12-28', NULL, b'0', '$2a$10$qeTJG93bcerg..Lo2POu0OglRpE1nM6BDQA6U1uGbajRXukat7YUm', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(11, 'Fady9', 'Fady', 'Karem', 'Fady9@gmail.com', '2022-12-28', NULL, b'0', '$2a$10$q9MPMFBRgUua7w34gD.9VuGiHjIeTFia15igzJSF/yRsVtEuAWyVi', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(12, 'ahmedr2001', 'Ahmed', 'Abdelatty', 'ahmedradalla2001@gmail.com', '2022-12-29', NULL, b'0', '$2a$10$h9Y4dJ4k7eJqF6SNHWVoZOeC3PtF0Pxr.ucR9X/SPd9..Ygy0fm1C', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(13, 'moh', 'Mohamed', 'Radalla', 'a@a.com', '2022-12-29', NULL, b'0', '$2a$10$clRj2MD3EvgZAvHFJVJ7JezXna/NJpuDAN0Ccc30momAxCUmUJIaW', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}');

--
-- Triggers `_user`
--
DELIMITER $$
CREATE TRIGGER `names_change` AFTER UPDATE ON `_user` FOR EACH ROW BEGIN
    IF OLD.FNAME <> new.FNAME OR OLD.SNAME <> new.SNAME THEN
        UPDATE course 
        set course.INSTRUCTORFNAME = new.FNAME, course.INSTRUCTORSNAME = new.SNAME
        WHERE course.INSTRUCTORID = new.ID;
        
        UPDATE article 
        set article.AUTHORFNAME = new.FNAME, article.AUTHORSNAME = new.SNAME
        WHERE article.INSTRUCTORID = new.ID;
        
        UPDATE quiz 
        set quiz.INSTRUCTORFNAME = new.FNAME, quiz.INSTRUCTORSNAME = new.SNAME
        WHERE quiz.INSTRUCTORID = new.ID;
    END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `INSTRUCTORID` (`INSTRUCTORID`);

--
-- Indexes for table `article_topic`
--
ALTER TABLE `article_topic`
  ADD PRIMARY KEY (`AID`,`TID`),
  ADD KEY `TID` (`TID`);

--
-- Indexes for table `choices`
--
ALTER TABLE `choices`
  ADD PRIMARY KEY (`ID`,`BODY`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `INSTRUCTORID` (`INSTRUCTORID`);

--
-- Indexes for table `course_topic`
--
ALTER TABLE `course_topic`
  ADD PRIMARY KEY (`CID`,`TID`),
  ADD KEY `TID` (`TID`);

--
-- Indexes for table `element`
--
ALTER TABLE `element`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `enroll`
--
ALTER TABLE `enroll`
  ADD PRIMARY KEY (`SID`,`CID`),
  ADD KEY `CID` (`CID`);

--
-- Indexes for table `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`LID`),
  ADD KEY `CID` (`CID`),
  ADD KEY `lesson_article` (`AID`),
  ADD KEY `lesson_quiz` (`QID`);

--
-- Indexes for table `likeonarticle`
--
ALTER TABLE `likeonarticle`
  ADD PRIMARY KEY (`UID`,`AID`),
  ADD KEY `AID` (`AID`);

--
-- Indexes for table `likeoncomment`
--
ALTER TABLE `likeoncomment`
  ADD PRIMARY KEY (`UID`,`CID`),
  ADD KEY `CID` (`CID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`MID`),
  ADD KEY `SENDER` (`SENDER`),
  ADD KEY `CID` (`CID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `INSTRUCTORID` (`INSTRUCTORID`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `INSTRUCTORID` (`INSTRUCTORID`);

--
-- Indexes for table `quiz_question_topic`
--
ALTER TABLE `quiz_question_topic`
  ADD PRIMARY KEY (`QID`,`NID`,`TID`),
  ADD KEY `NID` (`NID`),
  ADD KEY `TID` (`TID`);

--
-- Indexes for table `quiz_topic`
--
ALTER TABLE `quiz_topic`
  ADD PRIMARY KEY (`QID`,`TID`),
  ADD KEY `TID` (`TID`);

--
-- Indexes for table `readarticle`
--
ALTER TABLE `readarticle`
  ADD PRIMARY KEY (`SID`,`AID`),
  ADD KEY `AID` (`AID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `studenttakesquiz`
--
ALTER TABLE `studenttakesquiz`
  ADD PRIMARY KEY (`QID`,`SID`),
  ADD KEY `SID` (`SID`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `_comment`
--
ALTER TABLE `_comment`
  ADD PRIMARY KEY (`ID`,`AID`),
  ADD KEY `AID` (`AID`),
  ADD KEY `RID` (`RID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `_user`
--
ALTER TABLE `_user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `element`
--
ALTER TABLE `element`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `LID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `MID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `_comment`
--
ALTER TABLE `_comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `_user`
--
ALTER TABLE `_user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`INSTRUCTORID`) REFERENCES `instructor` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`ID`) REFERENCES `element` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `article_topic`
--
ALTER TABLE `article_topic`
  ADD CONSTRAINT `article_topic_ibfk_1` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `article_topic_ibfk_2` FOREIGN KEY (`TID`) REFERENCES `topic` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `choices`
--
ALTER TABLE `choices`
  ADD CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `question` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`INSTRUCTORID`) REFERENCES `instructor` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`ID`) REFERENCES `element` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course_topic`
--
ALTER TABLE `course_topic`
  ADD CONSTRAINT `course_topic_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `course` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `course_topic_ibfk_2` FOREIGN KEY (`TID`) REFERENCES `topic` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `enroll`
--
ALTER TABLE `enroll`
  ADD CONSTRAINT `enroll_ibfk_1` FOREIGN KEY (`SID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `enroll_ibfk_2` FOREIGN KEY (`CID`) REFERENCES `course` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `instructor`
--
ALTER TABLE `instructor`
  ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lesson`
--
ALTER TABLE `lesson`
  ADD CONSTRAINT `lesson_article` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `lesson_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `course` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lesson_quiz` FOREIGN KEY (`QID`) REFERENCES `quiz` (`ID`) ON UPDATE CASCADE;

--
-- Constraints for table `likeonarticle`
--
ALTER TABLE `likeonarticle`
  ADD CONSTRAINT `likeonarticle_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likeonarticle_ibfk_2` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likeoncomment`
--
ALTER TABLE `likeoncomment`
  ADD CONSTRAINT `likeoncomment_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likeoncomment_ibfk_2` FOREIGN KEY (`CID`) REFERENCES `_comment` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`SENDER`) REFERENCES `_user` (`USERNAME`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`CID`) REFERENCES `course` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`INSTRUCTORID`) REFERENCES `instructor` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_2` FOREIGN KEY (`ID`) REFERENCES `element` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_ibfk_3` FOREIGN KEY (`INSTRUCTORID`) REFERENCES `instructor` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `quiz_question_topic`
--
ALTER TABLE `quiz_question_topic`
  ADD CONSTRAINT `quiz_question_topic_ibfk_1` FOREIGN KEY (`QID`) REFERENCES `quiz` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_question_topic_ibfk_2` FOREIGN KEY (`NID`) REFERENCES `question` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_question_topic_ibfk_3` FOREIGN KEY (`TID`) REFERENCES `topic` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_topic`
--
ALTER TABLE `quiz_topic`
  ADD CONSTRAINT `quiz_topic_ibfk_1` FOREIGN KEY (`QID`) REFERENCES `quiz` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_topic_ibfk_2` FOREIGN KEY (`TID`) REFERENCES `topic` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `readarticle`
--
ALTER TABLE `readarticle`
  ADD CONSTRAINT `readarticle_ibfk_1` FOREIGN KEY (`SID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `readarticle_ibfk_2` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studenttakesquiz`
--
ALTER TABLE `studenttakesquiz`
  ADD CONSTRAINT `studenttakesquiz_ibfk_1` FOREIGN KEY (`QID`) REFERENCES `quiz` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studenttakesquiz_ibfk_2` FOREIGN KEY (`SID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_comment`
--
ALTER TABLE `_comment`
  ADD CONSTRAINT `_comment_ibfk_1` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_comment_ibfk_2` FOREIGN KEY (`RID`) REFERENCES `_comment` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_comment_ibfk_3` FOREIGN KEY (`UID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
