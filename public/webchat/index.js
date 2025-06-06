let isNewChatCustomized = false;

function hasChildNode(parentNode, childNode) {
    if (parentNode === childNode) {
       return true;
    }

    if (!parentNode.childNodes || !parentNode.childNodes.length) {
       return false;
    }

    for (const child of parentNode.childNodes) {
       if (hasChildNode(child, childNode)) {
          return true;
       }
    }

    return false;
 }

 function getAfterHours() {
   console.log('starting hours check')
    return fetch('https://tcom-twilio-service-9295-dev.twil.io/hours-of-operation-and-holiday/hoursOfOperationAndHoliday?flowCountry=US&&flowName=NABC%20Main%20US').then((data) =>{
       return data.json().then(obj => {
          console.log('obj: ', obj);
          return JSON.stringify(obj);
       });
    })
 }

 function getAgentAvailability(queue) {
    return fetch('https://tcom-twilio-service-9295-dev.twil.io/agent-active-count?queueName=' + queue).then((data) =>{
       return data.json().then(obj => {
          return JSON.stringify(obj);
       });
    })
 }

 // globally scoped
 let hoursChecked = false;
 let agentsChecked = false;
 let twilioConfig;

 const listenersAdded = {
    queueFieldClick: false,
 }

 const formFields = [];
 const webchatData = {
    metaConfig: {
       language: 'en_US',
       friendlyName: 'michael test'
    }
 };

 const originalName = webchatData.metaConfig.friendlyName;

 const queueFieldConfig = {clicked: 0};
 const questionFieldConfig = {clicked: 0};
 const nameFieldConfig = {clicked: 0};
 const startButton = document.getElementsByClassName('css-10ve73h')[0];

 const username = {
    display: 'InputItem',
    value: 'michael test'
 }


 window.addEventListener("load", () => {
     const appConfig = {
       deploymentKey: "CVce5ec95b6db37c9d5df82bdfc1f47ac0",
       appStatus: "closed",
       theme: {
          isLight: true
       },
       disablePreEngagementForm: false,
       context: {},
       preEngagementConfig: {
          title: "Chat with an Expert",
          description: "Please provide some information",
          submitLabel: "Start chat",
          fields: [
             {
                label: "Name *",
                type: "InputItem",
                attributes: {
                   name: "friendlyName",
                   type: "text",
                   placeholder: "Enter your name",
                   required: true,
                   pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                   readOnly: false,
                   value: username.value
                }
             },
             {
                label: "Inquiry Type *",
                type: "SelectItem",
                attributes: {
                   name: "InquiryType",
                   required: true,
                   readOnly: false
                },
                options: [
                   {
                      value: "",
                      label: "Select",
                      selected: true
                   },
                   {
                      value: "catcard",
                      label: "Cat Card",
                      selected: false
                   },
                   {
                      value: "loanlease",
                      label: "Loan/Lease",
                      selected: false
                   }
             ]
             },
             {
                label: "How can we help? *",
                type: "TextareaItem",
                attributes: {
                   name: "query",
                   type: "text",
                   placeholder: "Type your question here",
                   required: true
                }
             },
                ]
       }
     }
     twilioConfig = appConfig;
     Twilio.initWebchat(appConfig);
     changeButton()
   })

 function changeButton(e) {
    const expandWidth='150px'
    const collapseWidth='50px';
    const entryPointButtonContainer = document.getElementsByClassName('css-wonh0e')[0];
    entryPointButtonContainer.style.width = expandWidth
    const entryPointButton = document.getElementsByClassName('css-nbntra')[0];
    if (entryPointButton) {
        if (
            !e ||
            (e && e.target && e.target.parentNode && e.target.parentNode.className === 'css-d32nvv') ||
            (e && e.target && e.target.parentNode && e.target.parentNode.className === 'css-wonh0e') ||
            (e && e.target && e.target.parentNode && e.target.parentNode.parentNode && e.target.parentNode.parentNode.className === 'css-d32nvv')
        ) {
          entryPointButton.className = 'css-10ve73h';
          entryPointButton.style.width = expandWidth;
          hoursChecked = false;
          agentsChecked = false;
       }
    } else {
       const makeButtonSmall = document.getElementsByClassName('css-10ve73h')[0];
       makeButtonSmall.style.width = collapseWidth;
       makeButtonSmall.className = 'css-nbntra';
       makeButtonSmall.style.backgroundColor = 'rgb(255, 204, 0)';
       makeButtonSmall.style.color = 'black';
       makeButtonSmall.style.boxShadow = 'rgba(0, 0, 0, 0.5) 0px 2px 4px 0px';
    }
    const entryPointButtonInner = document.getElementsByClassName('css-zhc3mm')[0];

    if (entryPointButtonInner) {
       entryPointButtonContainer.style.width = expandWidth;
       entryPointButtonInner.style.fontWeight = '500';
       const entireButton = document.getElementsByClassName('css-10ve73h');
       if (entireButton.length) {
         entireButton[0].style.fontWeight = '500';
       }
       const icon = entryPointButtonInner.getElementsByTagName('svg')[0];
       icon.style.width = '40%';
       icon.style.height = '70%';
       icon.style.marginTop = "1px";
       icon.style.marginLeft = "-3px";
       const needHelp = document.createElement('span');
       needHelp.className = 'new-inner-button';
       needHelp.innerHTML = 'Need Help?';
       needHelp.style.fontFamily = 'arial, helvetica, sans-serif';
       needHelp.style.fontSize = '14px';
       needHelp.style.width = '50%';
       needHelp.style.marginTop = '5px';
       needHelp.style.marginBottom = '7px';
       needHelp.style.fontWeight = 'bold';
       entryPointButtonInner.prepend(needHelp);
       entryPointButtonInner.style.width = expandWidth;
       entryPointButtonInner.style.fontSize = 'smaller';
    }
}



 window.addEventListener("click", (e) => {
    // increment click counters for "required" tag
    if (queueFieldConfig.clicked) {
       queueFieldConfig.clicked++;
    }

    if (questionFieldConfig.clicked) {
       questionFieldConfig.clicked++;
    }

    if (nameFieldConfig.clicked) {
       nameFieldConfig.clicked++;
    }

    // customize button
    const newButtonText = document.getElementsByClassName('new-inner-button');
    if (!newButtonText.length) {
       changeButton(e);
    }
    if (document.getElementsByClassName('css-vjwxj7').length) {
       const startChatButton = document.getElementsByClassName('css-vjwxj7')[0];
       startChatButton.style.backgroundColor = 'rgb(255, 204, 0)';
       startChatButton.style.color = 'black';
       startChatButton.style.marginLeft = '14px';
    }
    if (document.getElementsByClassName('css-slcqjs').length) {
       Array.from(document.getElementsByClassName('css-slcqjs')).forEach(element => {
          element.style.marginLeft = '14px';
       })
    }

    // office hours check
    const preEngagementForms = document.getElementsByClassName('css-8w9ial');
    if (preEngagementForms.length && !hoursChecked) {
       //header
       const loadingHeader = document.createElement('div');
       loadingHeader.innerHTML = `
          <img class="css-5qycqm" src="https://catfinancial--sit.sandbox.my.site.com/mycatfinancial/resource/1676672747000/GC_TW_Twilio_Webchat/assets/images/catfin.png" />
          <div class="twilio-header">Chat with an expert</>
       `;
       loadingHeader.className = 'css-11qrk9w';
       const reclaimForm = preEngagementForms[0];
       reclaimForm.style.display = 'none';
       const formHolder = document.getElementsByClassName('css-2punnj')[0];
       const loading = document.createElement('div');
       loading.innerHTML = 'Loading...'
       loading.className ='chat-loading-message';
       if (!document.getElementsByClassName('chat-loading-message').length) {
           formHolder.prepend(loading);
           loading.prepend(loadingHeader);
       }
       const newHeader = document.getElementsByClassName('css-sunllh')[0]; // css-sunllh
       const exitButtons = document.getElementsByClassName('css-16zcszj');
       console.log('exit: ', exitButtons.length);
       if (newHeader && !exitButtons.length) {
          newHeader.innerHTML = '<div></div>';
          newHeader.style.color = 'white';
          newHeader.style.padding = '0';
       }
       getAfterHours().then((data) => {
          hoursChecked = true;
          const parsedData = JSON.parse(data);
          console.log('parsedData: ', parsedData);
          if (parsedData.closed) {
            console.log(preEngagementForms[0]);
             const canvas = document.getElementsByClassName('css-2punnj')[0];
             canvas.innerHTML = officeClosed();
          } else {
             const loading = document.getElementsByClassName('chat-loading-message')[0];
             if (loading) {
                loading.remove();
             }
             const reclaimForm = preEngagementForms[0];
             if (reclaimForm) {
                 reclaimForm.style.display = 'block';
             }
             customizePreEngagementForm();
             const requiredWarnings = document.getElementsByClassName('field-required');
             if (requiredWarnings.length) {
                Array.from(requiredWarnings).forEach((warning) => {
                   warning.remove();
                })
             }
             const selectElements = document.getElementsByClassName('css-yf6s6l')[0];
             if (selectElements && selectElements.length) {
                selectElements.style.border = 'none';
             }
             const questionTextBoxes= document.getElementsByClassName('css-b22qn9');
             if (questionTextBoxes.length) {
                questionTextBoxes[0].style.border = 'none';
             }
             // reset listeners and trackers
             queueFieldConfig.clicked = 0;
             questionFieldConfig.clicked = 0;
          }
        });
    }
    // show customized form after hours check
    if (hoursChecked) {
     customizePreEngagementForm();
    }
})// end onClick window listener

function customizePreEngagementForm() {
    //add header
    const line_1 = document.getElementsByClassName('css-11qrk9w')[0];
    if (line_1) {
        line_1.innerHTML = `
          <img class="css-5qycqm" src="https://catfinancial--sit.sandbox.my.site.com/mycatfinancial/resource/1676672747000/GC_TW_Twilio_Webchat/assets/images/catfin.png" />
          <div class="twilio-header">Chat with an expert</>
       `;
    }

    const newHeader = document.getElementsByClassName('css-sunllh')[0]; // css-sunllh
    const exitButtons = document.getElementsByClassName('css-16zcszj');
    if (newHeader && !exitButtons.length) {
       newHeader.innerHTML = '<div></div>';
       newHeader.style.color = 'white';
       newHeader.style.padding = '0';
    }

    const messageCanvas = document.getElementsByClassName('css-8w9ial')[0];
    if (messageCanvas) {
       messageCanvas.style.paddingTop = '0';
      //  messageCanvas.style.paddingLeft = '2px';
      //  messageCanvas.style.width = '276px';
       messageCanvas.style.width = '100%';
       messageCanvas.style.paddingLeft= null;

    }
    const formTitle = document.getElementsByClassName('css-1xtudba')[0];
    //add intent message
    if (formTitle) {
       formTitle.style.marginLeft = '14px';
       formTitle.style.fontFamily = 'arial, helvetica, sans-serif';
       formTitle.style.marginBottom = '15px';
       const intentMessage = document.createElement('div');
       intentMessage.className = "intent-message";
       intentMessage.style.fontFamily = 'arial, helvetica, sans-serif !important;'
       intentMessage.innerHTML = 'To ensure the safest handling of your data, the intended use of MyCatFinancial Chat is limited to general inquiries regarding navigating the MyCatFinancial site.For help involving Account and Personal information, please call us at 1-800-651-0567 for Loan & Lease, and 1-877-373-9510 for Cat Card.';
       intentMessage.style.fontSize = '12px';
       intentMessage.style.marginTop = '12px';
       if (formTitle.getElementsByClassName('intent-message').length === 0) {
          formTitle.append(intentMessage);
       }
    }

    // remove ugly borders
    const requiredFields = document.getElementsByClassName('css-slcqjs');
    Array.from(requiredFields).forEach(field => {
       field.childNodes[1].className = 'remove-class';
       field.childNodes[1].style.border = '1px solid #c6cad7';
    })

    // bold default dropdown option
    const dropDownOptions = document.getElementsByClassName('css-1raivgc');
    if (dropDownOptions) {
       Array.from(dropDownOptions).forEach((option, index) => {
          // make "select" bold
          if (option.innerHTML.includes('elect')) {
             option.style.fontSize = 'smaller';
             option.style.fontWeight = 'bold';
          }
       })
    }

    // ADD WARNINGS TO REQUIRED FIELDS
    const fields = document.getElementsByClassName('css-slcqjs');
    if (fields.length) {
       const requiredWarning = document.createElement('div');
       requiredWarning.innerHTML = 'Field required';
       requiredWarning.className = 'field-required';
       requiredWarning.style.color = 'rgb(203, 50, 50)';
       requiredWarning.style.fontSize = '12px';
       requiredWarning.style.marginBottom = "-20px";

       // required field, enter name
       const enterNameFields = document.getElementsByClassName('css-1gc43fm');
       if (enterNameFields.length) {
          const enterName = enterNameFields[0];
          const nameField = Array.from(fields).filter(field => hasChildNode(field, enterName))[0];
          const beforeClick = enterName.value;

          if (enterName) {
             enterName.addEventListener('click', () => {
                if (!nameFieldConfig.clicked) {
                   nameFieldConfig.clicked++;
                }
                const afterClick = enterName.value;
                if (beforeClick && !afterClick) {
                   nameFieldConfig.clicked++;
                }
             });

             enterName.addEventListener("keyup", () => {
                const { value } = enterName;
                webchatData.metaConfig.friendlyName = value;
                twilioConfig.context = webchatData.metaConfig;
                const warnings = nameField.getElementsByClassName('field-required');
                if (value) {
                   if (warnings && warnings.length) {
                      Array.from(warnings).forEach((warning, index) => {
                         warnings[index].remove();
                      });
                      enterName.style.border = 'none';
                      queueFieldConfig.clicked = 0;
                   }
                } else if (!warnings || !warnings.length) {
                   enterName.style.border = '1px solid rgb(203, 50, 50)'
                   nameField.append(requiredWarning);
                }
             });
          }
          // add name field warning
          if (
             nameFieldConfig.clicked > 2 &&
             (enterName && !enterName.value) &&
             !nameField.getElementsByClassName('field-required').length
          ) {
             enterName.style.border = '1px solid rgb(203, 50, 50)'
             nameField.append(requiredWarning);
          }
          // remove name field warning
          if (enterName && enterName.value) {
             const questionField = document.getElementsByClassName('css-slcqjs')[2];
             const warnings = nameField.getElementsByClassName('field-required');
             Array.from(warnings).forEach((warning, index) => {
                warnings[index].remove();
             });
             enterName.style.border = 'none';
             nameFieldConfig.clicked = 0;
          }

       }
       // required field, queue select
       const selectElementsArray = document.getElementsByClassName('css-yf6s6l');
       if (selectElementsArray.length) {
          const selectElements = selectElementsArray[0];
          const queueField = Array.from(fields).filter(field => hasChildNode(field, selectElements))[0];
          const dropdownSelection = selectElements.options[selectElements.selectedIndex].innerHTML;
          queueFieldConfig.value = dropdownSelection;
          const beforeClick = dropdownSelection;
          if (queueField) {
             queueField.addEventListener("click", e => {
                if (queueFieldConfig && !queueFieldConfig.clicked) {
                   queueFieldConfig.clicked++;
                }
                const afterClick = selectElements.options[selectElements.selectedIndex].innerHTML;
                if (beforeClick !== 'Select' && afterClick === 'Select') {
                   queueFieldConfig.clicked++;
                }
             });
          }
          // add queue select warning
          if (
             queueFieldConfig.clicked > 2 &&
             (dropdownSelection === 'Select') &&
             !queueField.getElementsByClassName('field-required').length
          ) {
             selectElements.style.border = '1px solid rgb(203, 50, 50)';
             const requiredWarning = document.createElement('div');
             requiredWarning.innerHTML = 'Field required';
             requiredWarning.className = 'field-required';
             requiredWarning.style.color = 'rgb(203, 50, 50)';
             requiredWarning.style.fontSize = '12px';
             requiredWarning.style.marginBottom = "-20px";
             queueField.append(requiredWarning);
          }
          // remove queue select warning
          if (dropdownSelection && dropdownSelection !== 'Select') {
             const warnings = queueField.getElementsByClassName('field-required');
             Array.from(warnings).forEach((warning) => {
                warning.remove();
             });
             const selectElements = document.getElementsByClassName('css-yf6s6l')[0];
             selectElements.style.border = 'none';
             queueFieldConfig.clicked = 0;
          }
       }

       // required field, question
       const questionTextBoxes = document.getElementsByClassName('css-b22qn9');
       if (questionTextBoxes.length) {
          const questionTextBox = questionTextBoxes[0];
          const beforeClick = questionTextBox.value;
          questionTextBox.addEventListener('click', () => {
             if (!questionFieldConfig.clicked) {
                questionFieldConfig.clicked++;
             }
             const afterClick = questionTextBox.value;
             if (beforeClick && !afterClick) {
                questionFieldConfig.clicked++;
             }
          })
          // add questionfield warning
          const questionField = Array.from(fields).filter(field => hasChildNode(field, questionTextBox))[0];
          if (
             questionFieldConfig.clicked > 2 &&
             !questionFieldConfig.value &&
             !questionField.getElementsByClassName('field-required').length
          ) {
             questionTextBox.style.border = '1px solid rgb(203, 50, 50)'
             questionField.append(requiredWarning);
          }
          // remove question field warning
          if (questionField && questionTextBox && questionTextBox.value) {
             const warnings = questionField.getElementsByClassName('field-required') || [];
             Array.from(warnings).forEach((warning, index) => {
                warnings[index].remove();
             });
             const questionTextBoxes= document.getElementsByClassName('css-b22qn9');
             questionTextBoxes[0].style.border = 'none';
             queueFieldConfig.clicked = 0;
          }

          questionTextBox.addEventListener("keyup", () => {
             const questionTextBoxes= document.getElementsByClassName('css-b22qn9');
             const warnings = questionField.getElementsByClassName('field-required') || [];
             if (questionTextBox && questionTextBox.value) {
                if (warnings && warnings.length) {
                   Array.from(warnings).forEach((warning, index) => {
                      warnings[index].remove();
                   });
                   questionTextBoxes[0].style.border = 'none';
                   queueFieldConfig.clicked = 0;
                }
             } else if (!warnings || !warnings.length) {
                questionTextBoxes[0].style.border = '1px solid rgb(203, 50, 50)';
                if (questionField) {
                   questionField.append(requiredWarning);
                }
             }
          });

       }

    }

    // run hours and agent check before sending webchat
    const startChatButtons = document.getElementsByClassName('css-vjwxj7');
    if (startChatButtons.length) {
      const startChatButton = startChatButtons[0];
      startChatButton.addEventListener('click', (event) => {
          console.log('clicked, agents checked? ', agentsChecked);
          if (!agentsChecked) {
             event.preventDefault();
             startChatButton.innerText = 'Submitting';
             startChatButton.disabled = true;
             const preEngagementForms = document.getElementsByClassName('css-8w9ial');
             const dropDownOptions = document.getElementsByClassName('css-1raivgc');
             const selectedQueue = Array.from(dropDownOptions).filter(option => option.selected)[0].value;

             getAfterHours().then((data) => {
                const parsedData = JSON.parse(data);
                if (parsedData.closed) {
                   preEngagementForms[0].innerHTML = '<div class="chat-loading-message">Office Closed</div>'
                } else {
                   getAgentAvailability(selectedQueue).then(availableAgents => {
                      if (+availableAgents === 0 && preEngagementForms.length) {
                        preEngagementForms[0].style.width="100%";
                        preEngagementForms[0].style.paddingLeft= null;
                        preEngagementForms[0].innerHTML = noAgentsAvailable();
                      } else {
                         agentsChecked = true;
                         startChatButton.disabled = false;
                         console.log('checks passed');
                         startChatButton.click();
                      }
                   });
                }
             });
          } else {
            console.log('sending chat');
          }
         // css-zeqpzn <== Add File Button
         // css-1x1ymg5 <== Message Input Box
         const targetNode = document.getElementsByClassName("css-2punnj")[0];

         const config = { attributes: true, childList: true, subtree: true };

         const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
               if (mutation.type === "childList") {
                  const addFileButtons = document.getElementsByClassName('css-zeqpzn');
                  if (addFileButtons.length) {
                     const addFileButton = addFileButtons[0];
                     console.log('addFileButton: ', addFileButton);
                  }
                  // observer.disconnect();
               }
            }
         };

         // Create an observer instance linked to the callback function
         const observer = new MutationObserver(callback);

         // Start observing the target node for configured mutations
         observer.observe(targetNode, config);


      })// end event listener
            }
} // end customizePreEngagementForm

function noAgentsAvailable() {
   return (`
      <div class="new-banner">
         <img class="css-5qycqm" src="https://catfinancial--sit.sandbox.my.site.com/mycatfinancial/resource/1676672747000/GC_TW_Twilio_Webchat/assets/images/catfin.png" />
         <div class="new-twilio-header">Chat with an expert</>
      </div>
      <br></br>
            <div class="webchat-modal-background">
               <div class="webchat-modal-container">
                  <div class="no-agent-image-container"></div>
                  <div class="webchat-modal-bold-text">Agents Unavailable</div>
                  <div class="webchat-modal-message-text">
                     <p>
                        Thank you for your patience. Our team is currently assisting other Cat Financial customers and unable to complete your request at this time. Please chat us again later or call us at 800-651-0567 for Loan & Lease and 877-373-9510 for Cat Card. We apologize for the inconvenience. In the meantime, you might be able to find what you’re looking for by browsing
                        <a href="https://catfinancial--sit.sandbox.my.site.com/mycatfinancial/s/gc-faq">our FAQ</a>.
                     </p>
                  </div>
                  <div>
                     <div class="twilio-webchat-button" onclick="backToForm()"><p style="margin-top: 7px;">okay</p></button>
                  </div>
               </div>
            </div>
   `);
}

function backToForm() {
   const entryPointButton = document.getElementsByClassName('css-nbntra')[0];
   setTimeout(() => {
      entryPointButton.click();
      setTimeout(() => {
         entryPointButton.click();
         setTimeout(() => {
            entryPointButton.click();
            setTimeout(() => {
               entryPointButton.click();
            }, 0)
         }, 0)
      }, 0);
   }, 0)
}

function minimizeChatWindow() {
   const entryPointButton = document.getElementsByClassName('css-nbntra')[0];
   entryPointButton.click();

}

function officeClosed() {
   console.log('office closed');
   return (
      `
         <div class="new-banner">
         <img class="css-5qycqm" src="https://catfinancial--sit.sandbox.my.site.com/mycatfinancial/resource/1676672747000/GC_TW_Twilio_Webchat/assets/images/catfin.png" />
         <div class="new-twilio-header">Chat with an expert</>
      </div>
      <br></br>
            <div class="webchat-modal-background">
               <div class="webchat-modal-container">
                  <div class="office-closed-image-container"></div>
                  <div class="webchat-modal-bold-text">Chat is currently unavailable</div>
                  <div class="webchat-modal-message-text">
                     <p>
                        Sorry we missed you! You’ve reached us after hours. We look forward to chatting with you during normal business hours (7 am – 6 pm Central). To leave a voicemail, please call 800-651-0567 for Loan & Lease, or 877-373-9510 for Cat Card, and we will get back to you as soon as possible. In the meantime, you might be able to find what you’re looking for by browsing
                        <a href="https://catfinancial--sit.sandbox.my.site.com/mycatfinancial/s/gc-faq">our FAQ</a>.
                     </p>
                  </div>
                  <div>
                     <div class="twilio-webchat-button" onclick="minimizeChatWindow()"><p style="margin-top: 7px;">okay</p></button>
                  </div>
               </div>
            </div>
      `
   );
}
/**
 *  const line_1 = document.getElementsByClassName('css-11qrk9w')[0];
    if (line_1) {
        line_1.innerHTML = `
          <img class="css-5qycqm" src="https://catfinancial--sit.sandbox.my.site.com/mycatfinancial/resource/1676672747000/GC_TW_Twilio_Webchat/assets/images/catfin.png" />
          <div class="twilio-header">Chat with an expert</>
       `;




      <div class="css-11qrk9w">
         <img class="css-5qycqm" src="https://catfinancial--sit.sandbox.my.site.com/mycatfinancial/resource/1676672747000/GC_TW_Twilio_Webchat/assets/images/catfin.png" />
         <div class="twilio-header">Chat with an expert</>
      </div>


      https://catfinancial--sit.sandbox.my.site.com/myca…GC_TW_Twilio_Webchat/assets/icons/users-slash.svg



 */