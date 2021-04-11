import React from 'react';
import Button from '../shared/ui/Button/Button';
import styles from './NewJobForm.module.css';
import {CreateAlert} from '../../store/actions/alert';

import {Slide1,TwoColSlide, OneColSlide, QualSlide, Slide2Open, SkillSlide} from './Slides';

import {db} from '../../firebase';
import {connect} from 'react-redux';

class NewJobForm extends React.Component{
    state = {
        nextButton:{
            text:"Next",
            icon:"",
        },
        loading:false,
        showBack:false,
        open:false,
        form : {
            step:"1",

            "1":{
                "Job Type":{ 
                    value:"On Campus", 
                    elementConfig:{
                        name:"position", 
                        options:["Campus", "Off Campus"]
                    },
                    elementType:"radio",
                    skip:true,
                    validation:"required"
                },
                "Job Position":{value:"", elementType:"input" , name:'title', 
                    elementConfig:{
                        placeholder:"eg. Software Developer"
                    },
                    validation:"required", limit:50},
                "Job Location": {value:"", elementType:"input", name:'job_loc',limit:20, validation:"required",
                    elementConfig:{
                        placeholder:"Enter city name"
                    }
                },
                "Interview Location":{ value:"", elementType:"input", name:'drive_loc', validation:"required", limit:100,
                    elementConfig:{
                        placeholder:"Enter complete address"
                    }    
                },
                "Employment Type":{ 
                    value:"", 
                    elementConfig:{
                        name:"employment Type", 
                        options:["Full Time", "Internship", 'Freelance']
                    },
                    elementType:"radio",
                    name:"type",
                    validation:"required"
                },
                "Salary": {value:"", elementType:'input' , 
                        elementConfig:{type:'text', placeholder: " eg. 10 LPA, 50K per month"}, 
                        name:"ctc",
                        validation:"required",
                        limit:30
                    },
                "Job Category":{ 
                    value:"Information Technology", 
                    elementConfig:{
                        options:[
                        "Aerospace",
                        "Transport",
                        "Information Technology",
                        "Telecommunication",
                        "Human Resources" ,
                        "Agriculture",
                        "Construction",
                        "Education and Edtech",
                        "Pharmaceutical" ,
                        "Food" ,
                        "Health Care",
                        "Hospitality" ,
                        "Entertainment" ,
                        "Media and News" ,
                        "Energy" ,
                        "Manufacturing" ,
                        "Mining",
                        "Sales and Marketing",
                        "Operations",
                        "Finance and Accounting",
                        "Legal",
                        "Production and Inventory",
                        "Research and Development",
                        "Purchase",
                        "Administration"]
                    },
                    elementType:"dropdown",
                    name:'category', validation:"required"},
                "Apply Before":{value:'', elementType:'input', name:'deadline' ,validation:"required future",
                elementConfig:{
                    type:'date'
                }},
                "Easy Apply":{
                    elementConfig:{
                        name:"easyApply",
                        options:["Ensvee", "External Website"]
                    },
                    value:"Ensvee",
                    elementType:"radio",
                    skip:true,
                },
                "Link":{
                    elementConfig:{ name:"link"},
                    value:"",
                    name:"link",
                    elementType:"input",
                    skip:true,
                }
            },
            "2-campus":{
                "Qualifications":{
                    value:[],
                    validation:"required",
                },
                "Xth ":{ 
                    value:0, 
                    name:"ssc", 
                    elementConfig:{
                        options:[0,60,70,80,90]
                    },
                    elementType:"dropdown"
                },
                "XIIth ":{ 
                    value:0, 
                    name:"hsc",
                    elementConfig:{
                        options:[0,60,70,80,90]
                    },
                    elementType:"dropdown"
                },
                "Diploma":{ 
                    value:0, 
                    elementConfig:{
                        options:[0,60,70,80,90]
                    },
                    elementType:"dropdown",
                    name:"diploma", 
                },
                "Bachelors ":{ 
                    value:0, 
                    elementConfig:{
                        options:[0,60,70,80,90]
                    },
                    elementType:"dropdown",
                    name:"bachelors", 
                },
                "Masters ":{ 
                    value:0, 
                    elementConfig:{
                        options:[0,60,70,80,90]
                    },
                    elementType:"dropdown",
                    name:"masters", 
                },
                
            },
            "3-campus":{
                "Schedule":{
                    value:"",
                    elementType:"textarea",
                    elementConfig:{ rows:5},
                    name:'schedule',
                    validation:"required",
                    limit:1000,
                },
                "Job Description":{
                    value:"",
                    elementType:"textarea",
                    elementConfig:{ rows:10},
                    name:'desc',
                    validation:"required",
                    limit:4000,
                }
            },
            "2-open":{
                "Schedule":{
                    value:"",
                    elementType:"textarea",
                    elementConfig:{ rows:5},
                    name:'schedule',
                    validation:"required",
                    limit:1000,
                },
                "Job Description":{
                    value:"",
                    elementType:"textarea",
                    elementConfig:{ rows:10},
                    name:'desc',
                    validation:"required",
                    limit:4000
                },
            },
            "3-open":{
                "Skills":{
                    value:[],
                    validation:"required",
                    name:'hskills'
                }
            }

        }
    }

    nextButtonHandler= async (e)=>{
        let form = {...this.state.form};
        let open = this.state.form["1"]["Job Type"].value =="Off Campus";
        let step = this.state.form.step;
        let stepCtn = Number(step[0]);
        
        if(await this.validateSection(step)) return;

        form = {...this.state.form};
        
        let nextButton = {...this.state.nextButton};
        const maxSteps = open? 3: 3;

        let showBack = true;

        nextButton.text= stepCtn == maxSteps-1 ? "Create Job Posting" : "Next";
        if(stepCtn == maxSteps)
            this.createJob();
        else
        {
            step = `${stepCtn+1}-${open?"open":"campus"}`;
            form.step = step; 
            this.setState({form, nextButton, showBack})
        }
        
    }

    backButtonHandler = (e)=>{
        let form = {...this.state.form};
        let open = this.state.form["1"]["Job Type"].value =="Off Campus";
        let step = this.state.form.step;
        let stepCtn = Number(step[0]);

        let nextButton = {...this.state.nextButton};

        nextButton.text =  "Next";

        if(stepCtn == 1)
            return
        else if(stepCtn == 2)
        {
            step = `1`;
            form.step = step; 
            this.setState({form, nextButton, showBack:false})
        }
        else
        {
            step = `${stepCtn-1}-${open?"open":"campus"}`;
            form.step = step; 
            this.setState({form, nextButton})
        }
    }

    jobTypeInputHandler=(e)=>{

        let step = {...this.state.form["1"]}
        let easyInput = {...this.state.form["1"]["Easy Apply"]}
        let linkInput = {...this.state.form["1"]["Link"]};
        let jobTypeInput = {...this.state.form["1"]["Job Type"]};
        jobTypeInput.value = e.target.value;

        if(e.target.value == "Off Campus"){
            easyInput.value ="Ensvee";
            linkInput.errors = undefined;
            easyInput.validation = "required";
        }
        else{
            easyInput.value ="Ensvee";
            linkInput.value = "";
            easyInput.validation = "";
            linkInput.validation = ""
        }

        step["Easy Apply"] = easyInput;
        step['Link'] = linkInput;
        step['Job Type'] = jobTypeInput;
        this.setState({form:{...this.state.form,"1": step}})

    }
    
    easyApplyInputHandler = (e)=>{
        let step = {...this.state.form["1"]}
        let easyInput = {...this.state.form["1"]["Easy Apply"]}
        let linkInput = {...this.state.form["1"]["Link"]};
        
        easyInput.value =  e.target.value;
        console.log(e.target.value)
        if(easyInput.value == "External Website"){
            linkInput.validation = "required url";
            linkInput.skip = false;
            linkInput.errors = []
        }
        else{
            linkInput.validation = "";
            linkInput.skip = true;
        } 

        step["Easy Apply"] = easyInput;
        step['Link'] = linkInput;
        this.setState({form:{...this.state.form,"1": step}})
    }

    inputChangeHandler=(e,step, label)=>{
        let inputState = {...this.state.form[step][label], value: e.target.value};
        // if( e.target.value.length > inputState.limit)
        // {
        //     inputState.value = inputState.value.slice(0, inputState.limit)
        // }
        this.setState({form:{...this.state.form, [step]:{...this.state.form[step], [label]:inputState}}})
        console.log(e.target.value, label, step)
    }

    validateSection(step){
        let hasErrors = false;
        let section = {...this.state.form[step]};

        console.log("validation section", step)
        for(let inputKey in section){
            let input = {...section[inputKey]};
            let errors= this.inputValidator(input);
            input['errors'] = errors;
            console.log(errors)
            section[inputKey] = input;
            if(errors.length > 0)
                hasErrors = true
        }

        console.log(section)
        return new Promise((resolve, reject)=>{
            this.setState({form:{...this.state.form, [step]:section}},()=>resolve(hasErrors))
        })
    }


    inputValidator(input){
        if(!input.validation) return [];
        let errors = [], checks = input.validation.split(" ");

        if(checks.find(sub=> sub=='required'))
        {
            if (!input.value)
                errors.push("Required")
            else if (Object.keys(input.value).length == 0)
                errors.push("Required")
        }
        if(!errors.length && checks.find(sub=> sub=="future") && new Date(input.value) < new Date())
            errors.push("Date must be in future");
        if(!errors.length && checks.find(sub=> sub=="url") && !this.validURL(input.value))
            errors.push("Invalid Url");
        return errors;
    }

    validURL=(str)=> {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }
      
    inviteHandler=(invited)=>{
    
        let step = this.state.form.step;
        let qualifications = {...this.state.form[step].Qualifications};
        let oldInvited = [...this.state.form[step].Qualifications.value];

        let index = oldInvited.findIndex((val)=>{
            return val.degree == invited.degree &&
            val.course == invited.course &&
            val.college == invited.college
        })

        if(index > -1)
            oldInvited.splice(index,1)

        qualifications.value = [invited,...oldInvited];

        this.setState({form:{...this.state.form, [step]:{...this.state.form[step], Qualifications:qualifications}}});
    }

    skillInputHandler = (skillsVal)=>{
        let step = this.state.form.step;
        let skills = {...this.state.form[step]["Skills"]};
        skills.value = skillsVal;
        this.setState({form:{...this.state.form, [step]:{...this.state.form[step], "Skills": skills}}});
    }


    deleteInviteHandler=(i)=>{
        let step = this.state.form.step;
        let invited = [...this.state.form[step].Qualifications.value];
        let qualifications = {...this.state.form[step].Qualifications};

        invited.splice(i,1);
        qualifications.value = invited;
        this.setState({form:{...this.state.form, [step]:{...this.state.form[step], Qualifications:qualifications}}});
    }
    
    async createJob(){

        if(this.state.loading) return;
        let job ={};
        let form = {...this.state.form};
        let open = this.state.form["1"]["Job Type"].value =="Off Campus";
        job['campus'] = !open;
        const openSteps = ["1","2-open","3-open"], campusSteps= ["1", "2-campus", "3-campus"];
        let steps = open? openSteps : campusSteps;
        
        steps.forEach(sectionKey=>{
            console.log(sectionKey);
            let section = form[sectionKey];
            if(sectionKey == "2-campus") return;

            for(let inputKey in section){
                let input = section[inputKey];
                if(input.skip) continue;
                job[input.name] = input.value;
            }
        });

        let edu = {}, percentages={'diploma': createPercentage(0), 'bachelors':createPercentage(0), 'masters':createPercentage(0),'ssc':createPercentage(0), 'hsc':createPercentage(0)};
        let qualSection = form['2-campus'];
        
        

        if(!open){
            
            for(let inputKey in qualSection)
            {
                if(inputKey=='Qualifications')
                    qualSection[inputKey].value.forEach(invited=>{
                        invited.year.forEach(year=>{
                            invited.branch.forEach(branch=>{
                                edu[`${invited.college}#${invited.degree}#${invited.course}#${branch}#${year}`] = true;
                            })
                        })
                        // edu.push(`${invited.college}#${invited.degree}#${invited.course}#${invited.branch}#${invited.year}`)
                    })
                else {
                    let input = qualSection[inputKey];
                    percentages[input.name] = createPercentage(input.value); 
                }   
            }

        
            job['edu'] = edu;
            job['marks'] = percentages;
                    
            let recipients = new Set();
            Object.keys(job['edu']).forEach(course=>{
                let college = course.split('#')[0];
                recipients.add(college);
            })
            job['recipient'] = {}
            
            Array.from(recipients).forEach(college=> {job['recipient'][college]= "pending"});
        }
        job['company'] = this.props.profile.name;
        job['status'] = true
        job['easy_apply'] = this.state.form['1']['Easy Apply'].value =="Ensvee" ? true : false; 
        job['creatorid'] = this.props.user.uid;
        job['created'] = new Date();
        job['deadline'] = new Date(job['deadline']);
        job['placed'] = false
        let uid = `${9999999999999999 - Date.now()}`;
        job['uid'] = uid;

        this.setState({loading:true});
        await db.collection('jobs').doc(uid).set(job);
        await db.collection('jobs').doc(uid).collection('count').doc(uid).set({count:0, newCount:0,hired:0, rejected:0, lastCheck: new Date()})
        this.setState({loading:false});
        this.props.close();
        this.props.createAlert({code:"success2", title:"Success", subtitle:"Job posted successfully"})
    }


    render(){
        let Slide;
        switch(this.state.form.step){
            case "1":
                Slide = <Slide1 easyHandler={this.easyApplyInputHandler} jobHandler={this.jobTypeInputHandler} step={this.state.form.step} inputs={this.state.form[this.state.form.step]} inputHandler={this.inputChangeHandler}/>;
                break;    
            case "2-campus":
                Slide = <QualSlide  inviteHandler={this.inviteHandler} deleteInviteHandler={this.deleteInviteHandler}  step={this.state.form.step} inputs={this.state.form[this.state.form.step]} inputHandler={this.inputChangeHandler}/>;
                break;
            case "3-campus":
            case "2-open":
                Slide = <OneColSlide step={this.state.form.step} inputs={this.state.form[this.state.form.step]} inputHandler={this.inputChangeHandler}/>;
                break;
            case "3-open":
                Slide = <SkillSlide inputs={this.state.form[this.state.form.step]} step={this.state.form.step} inputHandler={this.inputChangeHandler} />
        }

        return(
            <div className={styles.ModalContent}>
                {Slide}
                <div className={styles.ButtonTray}>
                    {this.state.showBack?<Button clicked={this.backButtonHandler} style={{width:"unset"}}>Go Back</Button>:null}
                    <Button loading={this.state.loading} clicked={this.nextButtonHandler} style={{width:"unset"}} primary>{this.state.nextButton.text}</Button>
                </div>
            </div>)
    }
}


const createPercentage =(val)=>({
    0 : 0  >= Number(val),
    60: 60 >= Number(val),
    70: 70 >= Number(val),
    80: 80 >= Number(val),
    90: 90 >= Number(val),
})

const mapStateToProps = (state)=>({
    user: state.auth.user,
    profile: state.auth.profile,
  })
const mapDispatchToProps = (disptach)=>({
    createAlert : (alert)=>disptach(CreateAlert(alert))
})
  
  export default connect(mapStateToProps, mapDispatchToProps) (NewJobForm);