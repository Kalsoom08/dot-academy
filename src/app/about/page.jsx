import Blogdata from '../../sections/About/aboutData';
import FAQ from '../../sections/About/aboutFaq';
import Stats from '../../components/stats';
import ExamFeatures from '../../components/examFeatures';


const Blog = () => {
  return (
    <div>
      <Blogdata/>
       <ExamFeatures/>
        <FAQ/>
      <Stats/>
     
     
    </div>
  )
}

export default Blog