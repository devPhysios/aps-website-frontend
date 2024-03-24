<template>
  <SideDashboard />

  <section class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-blue-100 rounded-md">
    <div class="my-1">
      <p class="text-4xl font-bold pl-4 pt-2">APS CONSTITUTION</p>
      <div class="flex items-center pl-4">
        <div class="md:w-1/4 w-3/4 bg-aps-green h-[4px]"></div>
        <div class="rounded-full h-4 w-4 bg-aps-orange"></div>
      </div>
    </div>

    <!-- Dropdown list for section navigation -->
    <div class="text-center">
      <select class="text-center bg-aps-orange rounded-2xl w-full p-4 font-semibold hover:bg-aps-green my-2"
        v-model="selectedSection" @change="navigateToSection">
        <option v-for="(data, index) in carouselData" :key="index" :value="index" class="text-center bg-aps-orange rounded-2xl p-4 font-semibold hover:bg-aps-green my-2">{{ data.name }}</option>
      </select>
    </div>

    <!-- Carousel component -->
    <Carousel v-bind="settings" :wrap-around="true" :autoplay="0" :pause-autoplay-on-hover="true"
      :breakpoints="breakpoints" v-model="currentSlide">
      <!-- Slide content -->
      <Slide v-for="(item, index) in carouselData" :key="index" class="h-full p-4">
        <div class="w-full rounded-lg text-gray-950 text-xl bg-white">
          <div class=" p-4 text-center">
            <h3 class="text-3xl font-semibold">{{ item.name }}</h3>
            <div v-for="(subItem, subIndex) in item.subArray" :key="subIndex" class="text-justify">
              <p class="text-lg pt-4 font-semibold">{{ subItem.section }}</p>
              <div v-for="(nestedItem, nestedIndex) in subItem.listItems" :key="nestedIndex">
                <p class="text-left py-1 text-base">{{ nestedItem.list }}</p>
                <div v-for="(subnestedItem, subnestedIndex) in nestedItem.sublistItems" :key="subnestedIndex">
                  <ul class="text-left py-1 text-base">
                    <li>{{ subnestedItem }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <!-- Pagination -->
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import SideDashboard from '../components/DashBoardSideMenu.vue'

const carouselData = ref([
  {
    name: 'ARTICLE 1 - STRUCTURE OF THE ASSOCIATION',
    page: 1,
    subArray: [
      {
        section: 'SECTION A',
        listItems: [{
          list: '',
          sublistItems: ['(1) Name: The Association shall be known, called and addressed as the Association of Physiotherapy Students (APS), University of Ibadan, Ibadan, herein referred to as "The Association"',
            '(2) Address: Block E, room EE, Alexander Brown Hall, University College Hospital Ibadan.',
          ],
        },
        {
          list: '',
          sublistItems: ['', '', ''],
        },
        ]
      },
      {
        section: 'SECTION B',
        listItems: [{
          list: '',
          sublistItems: [
            '(1) Symbol: The logo of the Association shall consist of a snake coiling round a crutch that is positioned between a hand and a spark. The snake stands for the oneness of the medical profession. The crutch symbolizes ambulation, the hand stands for massage and exercise therapy and the spark symbolizes electrotherapy.',
            '(2) Motto: The motto of the Association shall be "TO SERVE MANKIND AND HONOUR GOD"',
            '(3) Colour(s): Orange.']
        }]
      },
      {
        section: 'SECTION C',
        listItems: [{
          list: 'CITATION AND SUPREMACY OF THE CONSTITUTION',
          sublistItems: [
            '(1) This Constitution shall be cited as the “Constitution of the Association of Physiotherapy Students, University of Ibadan”.',
            '(2) The provisions of this constitution shall be binding on all authorities and members of the Association.',
            '']
        }]
      },
    ]
  },


  {
    name: 'ARTICLE 2 - AIMS',
    page: 2,
    subArray: [
      {
        section: '',
        listItems: [{
          list: '',
          sublistItems: ['(1) To protect the rights and privileges of her members.',
            '(2) To create awareness of the profession among the general public.',
            '(3) To promote cordial relationship with other student bodies within and outside the country whose objectives are acceptable to the Association.',
            '(4) To ensure mutual interactions amongst members.',
            '(5) To create awareness among members about the latest trend in physiotherapy practice in Nigeria and the rest of the world.',
            '(6) To organize activities that will harmonize the pre-clinical and clinical students.',
          ],
        },
        ]
      },
    ]
  },


  {
    name: 'ARTICLE 3 - MEMBERSHIP, OBLIGATIONS AND PRIVILEGES',
    page: 3,
    subArray: [
      {
        section: 'SECTION A',
        listItems: [{
          list: '',
          sublistItems: ['(1) ORDINARY MEMBERSHIP: This shall be an automatic conferment on any (undergraduate) student that is registered for training in the Department of Physiotherapy, College of Medicine, University of Ibadan, Ibadan.',
          ],
        },
        {
          list: '(2) ORDINARY MEMBERS: An ordinary member shall:',
          sublistItems: ['a) Be a full financial member of the Association',
            'b) Attend meetings and participate actively in all functions of the Association',
            'c) Uphold the integrity of the Association and protect her interest',
            'd) Be fully bound by the provisions of this constitution',],
        },
        {
          list: '(3) PRIVILEDGES: Ordinary members shall have the privilege to:',
          sublistItems: ['a) Vote and be voted for in any approved elections of the Association',
            'b) Be protected by the Association in matters where the APS senate deems the intervention of the Association necessary',
            'c) Append signature to a referendum requesting extraordinary general meetings',
            'd) Wear and display official emblems of the Association',
            'e) Use the facilities provided and recognized by the Association',
            'f) Obtain on first registration a copy of the Association’s constitution',
            'g) Be invited to academic and social functions of the Association. ,',],
        },
        ]
      },
      {
        section: 'SECTION B',
        listItems: [{
          list: '',
          sublistItems: [
            'HONORARY MEMBERSHIP: Honorary membership may be conferred on any individual or group of individuals who have shown interest in the activities of the APS for at least 5 years and assessed fit by virtue of past contributions to the study of Physiotherapy in the University of Ibadan, Ibadan or interest in activities of the Association on recommendation by the Executive Council to the APS senate for ratification.',]
        },
        {
          list: 'OBLIGATIONS: Honorary members shall:',
          sublistItems: [
            'I. Continue their active co-operation with the Association in future. li. Support the Association financially',
            'II. Uphold the integrity of the Association and protect her interest.',]
        },
        {
          list: 'PRIVILEGES: Honorary members shall:',
          sublistItems: [
            '1. Be entitled to use facilities provided and recognized by the Association.',
            'II. Be entitled to use and display official emblems and colours of the Association.',
            'III. Have no voting right.',
            'IV. Have the right to attend meetings of the Association',
            'V. Have the right to be invited to academic and social functions of the Association.',
          ]
        },]
      },
      {
        section: 'SECTION C',
        listItems: [{
          list: '',
          sublistItems: [
            'LIFE MEMBERSHIP: Shall be conferred on past members of the Association who have distinguished themselves as ordinary members, Executive Council, Member of Adhoc committee of the Association, or those who show strong interests in the activities of the Association on recommendation of the Executive Council and approved by the APS senate.',
            'PRIVILEGES: Shall be as for Honorary members.',]
        }]
      },
      {
        section: 'SECTION D',
        listItems: [{
          list: 'TERMINATION OF MEMBERSHIP',
          sublistItems: [
            '',]
        },
        {
          list: 'TERMINATION OF ORDINARY MEMBERSHIP',
          sublistItems: [
            'A student shall cease to be an ordinary member:',
            '(1) on his/her graduation from the Physiotherapy Department as a licensed Physiotherapist.',
            '(2) on change from the department.',
            '(3) On withdrawal from the department.',
            '(4) If found wanting and expelled by the Student Disciplinary Committee of the University of Ibadan.',
            'The APS Senate reserves the right to suspend the membership of any member found guilty of contravening the decision of the Senate.',]
        },
        {
          list: 'TERMINATION OF HONORARY MEMBERSHIP',
          sublistItems: [
            'An individual shall cease to be an honorary member of the association if he/she;',
            '(1) Discontinued their active cooperation with the association for more than two years',
            '(2)Involved in any action that tarnished their image and/or that of the Association The APS Senate reserves the right to suspend the membership of any member found guilty of contravening the decision of the senate.',]
        }]
      },
    ]
  },


  {
    name: 'ARTICLE 4 - ADVISORY COUNCIL',
    page: 4,
    subArray: [
      {
        section: 'SECTION A',
        listItems: [{
          list: '',
          sublistItems: ['ADVISERS: The head of Physiotherapy department, University of Ibadan, Ibadan, the staff adviser and the Chairman of the state chapter of the Nigerians Society of Physiotherapy shall be automatic advisers. Any other adviser may also be chosen by the Executive Council, subject to the approval of the APS Senate.',
            'PATRONS/MATRONS: The current provost of the College of Medicine, University of Ibadan, Ibadan shall be automatic patron/matron of the Association and five other patriotic Nigerians from all walks of life on recommendation of the Executive Council and approved by the APS Senate.',
            '• A copy of the constitution should be sent to all patrons/ matrons of the Association.'
          ],
        },
        ]
      },
      {
        section: 'SECTION B',
        listItems: [{
          list: '',
          sublistItems: [
            'GRAND PATRON/MATRON: Shall be conferred on anybody who has served the Association actively as the patron/matron for the last five years as approved by the general congress.',]
        }]
      },
      {
        section: 'SECTION C',
        listItems: [{
          list: '',
          sublistItems: [
            'LIFE PATRON/MATRON: Shall be conferred on anybody who has served the Association actively as the Grand patron/matron for the last five years as approved by the general congress.',
          ]
        }]
      },
      {
        section: 'SECTION D',
        listItems: [{
          list: 'OBLIGATIONS',
          sublistItems: [
            'I. Their advice shall be needed from time to time',
            'II. They shall be informed of all important issues affecting the Association',
            'III. They shall receive the APS Executive or accredited representatives of the Association',
            'IV. They shall be expected to generously donate in cash and kind to the upkeep of the Association',
          ]
        }]
      },
    ]
  },


  {
    name: 'ARTICLE 5 – ELECTION',
    page: 5,
    subArray: [
      {
        section: 'SECTION A: ELECTORAL COMMISSION',
        listItems: [{
          list: '(I) COMPOSITION',
          sublistItems: ['• There shall be an electoral commission consisting of six (6) members.',
            '• They shall be financial members of the Association and should not be members of the Executive Council or Senate.',
            '• There shall be one chairperson from the final year class and a representative from each level.',
            '• Nominations for the position of the chairperson shall be made by the Executive Council and forwarded to the Senate for ratification and selection. It is important that the nominated individual has served in the commission for at least one year.',
            '• Only the chairperson has the power to choose members of his commission',
            '• The electoral commission shall be set up two weeks prior to any political exercise within the association.',
            '• The commission shall be answerable only to the Senate',
            '• No member of the association shall be a member of the electoral commission for two consecutive years.',
          ],
        },
        {
          list: '(II) FUNCTIONS OF THE ELECTORAL COMMISSION',
          sublistItems: ['• The commission shall conduct all elections within the Association.',
            '• The commission shall conduct all elections within the Association.',
            '• They shall have the power to disqualify;',
            '1. Any candidate who violates the electoral law.',
            '2. Any candidate who has ever forfeited his seat in the senate.',
            '3. Any aspirant who had resigned an office before the expiration of his/her term of office for reasons unacceptable to the commission.',
            '• They shall clear aspirants financially.',
            '• The electoral commission shall publish the names of candidates, their referees and the offices the candidates are aspiring to occupy.',
            '• They shall declare the election result not later than 24 hours after such election.',],
        },
        ]
      },
      {
        section: 'SECTION B: ELECTORAL LAW',
        listItems: [{
          list: '',
          sublistItems: [
            '• All election of the officers shall be by voting',
            '• A voter shall cast a vote for an aspirant',
            '• Voting shall be by secret ballot system only.',
            '• The electoral commission shall not favour any candidate or alter election results.',
            '• An electoral officer shall loose his/her voting right on appointment.',
            '• Withdrawal and submission of candidature shall be made to the electoral commission not later than 48 hours before the election.',
            '• All campaigns should stop on or before 11:59 pm on the manifesto night,which is the day prior to the election. Any aspirant or his supporters found violating this Article of the constitution shall have his/her candidature nullified',
            '• Election shall be held not later than two weeks to the university’s end of second semester examinations',
            '•The electoral commission is automatically disbanded after the publication of the final results.',]
        },
        {
          list: 'BYE ELECTION',
          sublistItems: [
            '- In the case of a tie or a vacant position, a bye election shall be conducted by the senate house in not later than a period of two weeks.',
            '- The price of forms and announcement of the bye election shall be made public by the senate.',
            '- In the event that the post stills remains vacant after the two weeks period, the executive council shall send a nomination to the senate house for ratification.',]
        },
        {
          list: 'CANDIDATURE',
          sublistItems: [
            '• An aspirant shall be a financial member of the Association who has never defaulted for any session.',
            '• Members of the electoral commission cannot nominate candidates for election, neither can they serve as referees',
            '• There shall be a nomination form to be obtained by the aspirant to various offices',
            '• Any officer of the Association Shall have the right to stand for reelection or contest for any other post so far as such contestant has no proven record of official misconduct, abuse of office, or any such act that can tarnish the image of the Association.',
            '• An aspirant shall possess a minimum academic requirement of 2.3 using a 4.0 CGPA to contest for any political post.',]
        },]
      },
    ]
  },


  {
    name: 'ARTICLE 6 - THE SENATE',
    page: 6,
    subArray: [
      {
        section: 'SECTION A: STATUS',
        listItems: [{
          list: '',
          sublistItems: ['ESTABLISHMENT: There shall be a body known as the APS SENATE, which shall be the representative, policy-making body of the Association.',
            'Financial members of the Association shall constitute it.',
          ],
        },
        {
          list: '',
          sublistItems: ['COMPOSITION: It shall consist of elected members, three (3) from each level. The 100 level class shall be represented by two members; the class representative and assistant class representative of the class. Members of the APS SENATE shall be known and addressed as SENATORS in the Associations references.',],
        },
        {
          list: '',
          sublistItems: ['MEMBERSHIP: Membership of the APS Senate shall be by election which will be conducted by the electoral commission. Members of the APS Senate shall be known and addressed as Senators.',],
        },
        ]
      },
      {
        section: 'SECTION B: FUNCTIONS',
        listItems: [{
          list: 'The APS SENATE shall have the following functions:',
          sublistItems: [
            '(1) To act for the APS in conformity with the aims and practices of the Association concerning all matters which may arise from time to time,',
            '(2) To approve the sessional budget and capital project(s) of the Association. The budget shall be approved within ten (10) working days of its submission failing which the Executive Council can run the Association on not more than 30% of the budget.',
            '(3) To direct, if it chooses, that a referendum be conducted in order to determine any matter whatsoever',
            '(4) To approve or reject the names) of students) or any members) of the public to be given award(s) the Executive Council.',
            '(5) To see that no officer carry out any other duty other than those stipulated within his portfolio and in other articles of this constitution.',
            '(6) To set up a disciplinary committee, which shall be made up of five (5) members of the senate, headed by the Chief Whip. In the case the Chief Whip is the one to be disciplined, the Senate President shall head the committee.',
            '(7) Members shall consult students of their classes when going for a meeting and give feedback after the meeting.',
            '(8) To give full report of its action to the congress at the expiration of its term of office through the Senate President or when deemed necessary.',
            '(9) To conduct all bye elections within the association.',]
        }]
      },
      {
        section: 'SECTION C: MEETING OF THE APS SENATE',
        listItems: [{
          list: 'I. GENERAL MEETING',
          sublistItems: [
            '• The senate shall have its first meeting latest two (2) weeks after the inauguration of new senators.',
            '• The Senate shall meet at least six (6) times every session before its dissolution.',
            '• All officers of the Senate shall be elected by the Senate at its first meeting among its members. The outgoing Senate President shall preside over the election of the officers. Alternatively, an acting Senate President may be chosen among Members of the Senate to preside over the election. Such acting Senate president shall automatically lose his/her voting right at the election.',
            '• Two-third of the membership of the senate shall constitute a quorum for all meetings of the Senate',
            '• Voting shall be by showing of hands except when the members press for a division, or the Senate President considers a secret ballot necessary.',
            '• The Senate President shall have no voting right, except when there is a tie.',
            '• Members who are absent from three (3) meetings without prior notice shall automatically face disciplinary committee and shall be punished based on the recommendations of the disciplinary committee.',]
        },
        {
          list: 'II. SPECIAL MEETINGS',
          sublistItems: [
            'Special meetings may be summoned:',
            '• Through a written petition of one third (1/3) of the members of the APS Senate provided notice of such meeting has been given to the Senate President at least 48 hours before the said meeting.',
            '• At the instance of the Senate President and/or the APS President.',
          ]
        },]
      },
      {
        section: 'SECTION D: OFFICERS OF THE SENATE',
        listItems: [{
          list: 'I. The officers of the Senate shall consist of the following:',
          sublistItems: [
            'a) The Senate President',
            'b) The Deputy Senate President',
            'c) The Clerk of the Senate',
            'd) The Chief Whip',]
        },
        {
          list: 'II. Duties of the officers',
          sublistItems: [
            '(a) The Senate President',
            '• Shall come from the final year class as at the time of the in-house election and he/she must have served in the Senate for at least one tenure. If none of the elected senators from the final year class as at the time of the in-house election have served in the Senate, then anyone of them can be voted as the Senate President.',
            '• Shall preside over all meetings of the Senate and congress meetings',
            '• Shall have power to maintain order in the Senate.',
            '• Shall subject to the provisions in this constitution instruct the Clerk of the Senate to summon meetings of the Senate.',
            '• Shall impartially direct the proceedings of the Senate and shall execute other functions conferred on him/her under the provisions of this constitution.',
            '• Shall at the meeting of the Senate interpret the constitution of the Association in good faith.',
            '• Shall be one of the official representatives of the Associations interest with the "Institutions Authority".',
            '• Shall rule in matters on which the constitution is silent and his/her ruling shall only be reversed by two-thirds (2/3) majority of members present at the meeting.',
            '• Shall supervise the election of the incoming officers.',]
        },
        {
          list: '(b) The Deputy Senate President',
          sublistItems: [,
            '• Shall be a clinical student (300 or 400 level) as at the time of the in-house election.',
            '• Shall assist the Senate President from time to time and shall perform all the duties of the Senate President in his/her absence',
            '• Shall supervise casting of votes and give the result to the Senate President for announcement',
            '• Shall organize the venue of meetings',
            '• Shall perform all other functions duly assigned to him by the Senate President',
          ]
        },
        {
          list: '(c) The Clerk of the Senate',
          sublistItems: [,
            '• Shall be a clinical student (300 or 400 level) as at the time of the in-house election.',
            '• Shall summon all Senate meetings with permission from the Senate President.',
            '• Shall give notices of meetings at least two (2) days to the conveyance date.',
            '• Shall take the minutes and record of the proceedings at the Senate.',
            '• Shall read minutes of the previous sitting which shall be adopted by the house.',
            '• Shall carry out other functions as may be assigned to him/her by the Senate President.',
          ]
        },
        {
          list: '(d) The Chief Whip',
          sublistItems: [,
            '• Shall during every meeting of the Senate, take attendance of the members present, and forward a list of absentees to the Senate President.',
            '• Shall maintain discipline in the house.',
            '• Shall automatically be the head of the disciplinary committee set up by the Senate President.',
            '• Shall take the minutes and record of the proceedings at the Senate.',
            '• Shall maintain law and order during congress meetings.',
          ]
        },]
      },
      {
        section: 'SECTION E: DISCIPLINE OF SENATORS',
        listItems: [{
          list: '',
          sublistItems: [
            '1. (a) The Senate shall make for herself a code of conduct guiding the Senators to be known by the name "The "Senate Standing Order" and shall be binding on all Senators. ',
            '(b)Any member of the Senate can be disciplined based on the provisions of The Senate Standing Order.',
          ]
        }]
      },
    ]
  },


  {
    name: 'ARTICLE 7: THE EXECUTIVE COUNCIL',
    page: 7,
    subArray: [
      {
        section: 'SECTION A: COMPOSITION',
        listItems: [{
          list: 'There shall be an Executive Council, which shall consist of the following',
          sublistItems: ['• President (who shall be in the penultimate class (400 level) as at the time of the election)',
            '• Vice President (who shall be a clinical student (300 or 400 level) as at the time of the election)',
            '• General Secretary (who shall be a clinical student (300 or 400 level) as at the time of the election)',
            '• Assistant General Secretary (who shall either be a second year pre-clinical or clinical student (200, 300 or 400 Level) as at the time of the election)',
            '• Financial Secretary (who shall be a clinical student (300 or 400 level) as at the time of the election)',
            '• Treasurer (who shall be a clinical student (300 or 400 level) as at the time of the election)`',
            '• Public Relations Officers (who shall either be a second year pre-clinical or clinical student (200, 300 or 400 Level) as at the time of the election)',
            '• Special Duties Officer (who shall be a pre-clinical student (100 or 200 level) as at the time of the election)',
            '• Social Secretary (who shall either be a second year pre-clinical or clinical student (200, 300 level) as at the time of the election)',
            '• Sports Secretary (who shall either be a second year preclinical or clinical student (200, 300 or 400 level) as at the time of the election)',
            '() - This means the level at which an individual is eligible to contest for an office',
          ],
        },
        ]
      },
      {
        section: 'SECTION B: POWERS',
        listItems: [{
          list: '',
          sublistItems: [
            ' It shall be responsible for the day to day running of the activities of the Association and shall be responsible to the APS Senate for its actions.',
            '• It shall keep members of the Association informed concerning the general conduct of the affairs of the APS.',
            '• Shall furnish members with information requested with respect to any particular matter relating to the governance of APS.']
        }]
      },
      {
        section: 'SECTION C: DUTIES OF THE OFFICERS',
        listItems: [{
          list: '(a) President',
          sublistItems: [
            '• Shall preside over all executive meetings of the Association',
            '• Shall be the leader of the Association and head of the Executive Council',
            '• Shall be responsible for coordinating and supervising the activities of other officers',
            '• Shall be one of the representatives of the Association"s interest with the institution"s Authority',
            '• Shall summon all meetings through the General Secretary',
            '• Shall summon emergency meetings when necessary, with consent of at least three (3) members of the Executive',
            '• Shall be a signatory to APS accounts and documents',
            '• Shall sign the minutes of all Executive and Congress meetings and the accurate records of the proceedings of such meetings after approval by the members who are present at the meetings',
            '• May write a press release(s) and shall be a signatory to any press release by the Executive Council',
            ' Shall in conjunction with other members of the Executive Council draw up programmes for the session and forward it to the Senate for approval.',
            '• Shall draw up a budget in conjunction with the members of the Executive Council and forward it to the senate for approval. If the approval is not given within ten (10) working days, the Executive Council shall run the Association on not more than 30% of the total budget',
            '• Shall have the power to assign non-specified duties to all other members of the Executive Council.',
          ]
        },
        {
          list: '(b) Vice President',
          sublistItems: [
            '• Shall assist the President in his/her duties and deputize for him/her in his/ her absence',
            '• Shall in cooperation with other Executive members advice the President',
            '• Shall be Chairman of the Physiotherapy Week Committee',
            '• Shall automatically become President if the post becomes vacant before the expiration of the tenure',
            '• Shall summon all meetings through the General Secretary',
            '• Shall summon emergency meetings when necessary, with consent of at least three (3) members of the Executive',
          ]
        },
        {
          list: '(c) General Secretary',
          sublistItems: [
            '• Shall be in charge of the Associations secretariat',
            ' Shall on request from the President convene Executive Council meetings of the Association',
            '• Shall on request from the President and with the consent Aps Senate convene congress meetings of the Association',
            '• Shall keep detailed minutes of all Executive Council meetings',
            '• Shall be solely responsible for the writing and replying of the Association"s correspondences',
            '• Shall read detailed annual report on the activities of the Executive Council',
            '• Shall automatically become a member and the head of the Academic Commission on election into office.',
          ]
        },
        {
          list: '(d) Assistant General Secretary',
          sublistItems: [
            '• Shall assist the secretary in his/her duties an conduct for him in absentia',
            ' • Shall carry out any of the duties as assigned to him/her by the Executive Council of the Association',
          ]
        },
        {
          list: '(e) Financial Secretary',
          sublistItems: [
            '• Shall keep up to date, account of the Association"s financial transactions',
            ' • Shall be responsible for collecting annual dues, registration fees and other dues as may be approved by the Executive Council',
            ' • Shall hand-over to the treasurer all money collected on behalf of the Association within 48 hours of such collection.',
            ' • Shall be a signatory to the Associations account.',
          ]
        },
        {
          list: '(f)Treasurer',
          sublistItems: [
            '• Shall keep custody of the Association"s money, pass book and chequebook',
            ' • Shall bank any money received from the financial secretary on behalf of the Association in an approved bank within 48 hours of receipt of such money',
            ' • Shall keep all financial transactions of the Association Shall be a signatory to the Association"s account.',
          ]
        },
        {
          list: '(g) Public Relations Officer',
          sublistItems: [
            '• Shall be responsible for all internal and external publicity of the Association"s programs',
            '  Shall be a member of all committee to handle the area of publicity. ',
            ' • Shall be the information officer of the Association. ',
            '• Shall be the link between the press and the Executive Council',
          ]
        },
        {
          list: '(h) Social Secretary',
          sublistItems: [
            '• Shall be responsible for planning and execution of any social activity of the Association',
            ' • Shall perform the function above, subject to ratification of the Executive Counci ',
            ' • Shall be a member of any other committee and perform any other function for the Association as may be assigned to him/her by the Executive Council. ',
          ]
        },
        {
          list: '(i) Sports Secretary',
          sublistItems: [
            '• Shall be in charge of Sporting activities in which the Association is involved',
            '• Shall perform other functions as assigned to him/her by the Executive Council',
            ' • Shall be in charge of all sporting equipment of the Association ',
          ]
        },
        {
          list: '(j) Special Duties Office',
          sublistItems: [
            '• Shall be in charge of information dissemination in the pre-clinical school to compliment the effort of the P.R.O',
            ' • Shall perform every other function assigned to him/her by the Executive Council',
          ]
        },]
      },
      {
        section: 'SECTION D: DISCIPLINE OF THE EXECUTIVE COUNCIL',
        listItems: [{
          list: '1. All members of the Executive should be disciplined and carry out their official duties efficiently and with strict adherence to the Constitution, laws passed by the Senate and resolutions of the Congress. However, a disciplinary action shall be taken against any erring members of the Executive in accordance with the provisions of this article',
          sublistItems: [
            ' ']
        },
        {
          list: '2. Any member of the Executive who fails to perform his duties as specified in section C above shall be queried by the President. Where the explanation given is considered unsatisfactory or not tenable, the President shall refer the matter to the Senate in writing',
          sublistItems: [
            ' ']
        },
        {
          list: '3. The President should be referred to the Senate when he errs by a letter written by the member of the executive council or the person leveling the allegation.',
          sublistItems: [
            ' ']
        },
        {
          list: '4. On receipt of the letter, the Senate shall constitute a five man- committee to investigate and report her findings within two (2) weeks. If the individual is found guilty, an appropriate action shall be taken by the Senate in accordance with items 5 and 6 below.',
          sublistItems: [
            ' ']
        },
        {
          list: '5. (a) A member of the Executive shall be suspended from office by a simple majority vote of the Senators present at a duly constituted Senate meeting; if he is found guilty of any of the following offences:',
          sublistItems: [
            ' • Absence from executive meetings to which he is duly notified for three occasions without the permission of the president.',
            '• Absence from executive meetings to which he is duly notified for three occasions without the permission of the president',
            '• Absence of an executive from meetings of the senate to which he is duly notified three occasions without the permission of the Senate Chairman. ',
            '• Misappropriation of funds',
            '(b) The duration of the suspension shall be determined by the Senate.',]
        },
        {
          list: '6. Any member of the Executive shall be removed from office by a two-third majority vote of Senators present at a duly constituted Senate meeting; if he is found guilty of any of the following:',
          sublistItems: [
            ' • Embezzlement of funds;',
            '• Dereliction of duty;',
            '• Constitutional breach:',
            '• Any action that a simple majority of the Senate considers as to have undermined the integrity of the Association.',]
        }
          ,]
      },
      {
        section: 'SECTION E: RESIGNATION OF EXECUTIVE MEMBERS',
        listItems: [{
          list: '',
          sublistItems: [
            '• Resignation shall be in writing to the office of the General Secretary.',
            '• Having accepted the resignation of the said officer, the Senate shall request the Executive Council to recommend three (3) names out of which one shall be approved for the post concerned ',
            '• Any officer of the Association may be removed after trial and having been found guilty by a resolution adopted by two-third (2/3) majority of the Senate as a result of allegation(s) by any member of the Association. Any officer so removed shall not be eligible to contest any other election throughout his stay in the institution.',
            '• Any member of the Executive Council, the Senate (including its officers) and the Physiotherapy press (including its editorial board members) and committees shall cease to be in office to perform his/her duties if there is a motion of impeachment against him/her pending the final determination of such a case.',]
        }]
      },
      {
        section: 'SECTION F: HANDING OVER',
        listItems: [{
          list: '',
          sublistItems: [
            '• The dissolution of out-going Executives and the swearing in of newly elected Executives shall take place not later than four (4) weeks to the end of the session',
            '• An officer on relinquishing his post should promptly hand over all the properties of the Association in his custody to his/her successor. For that purpose, he/she shall prepare a list in triplicate of the articles being handed ',
            '• The original of that list shall be sent to the Senate President for the information of the Senate and remaining two (2) copies shall be for the retiring and relieving officer concerned.',
            '• A successor to an office should direct a complaint to the Senate through the Senate President for the Associations property unaccounted for or which cannot be traced.',
            '• The Senate after deliberation on the issue shall take a decisive action against the concerned officer and if necessary refer to the Department through the Staff Adviser',
            '• Any member of the executive council that fails to hand over any property of the association shall be mandated to pay a fine equivalent to the property unaccounted for.',]
        },

        ]
      },
      {
        section: 'SECTION G: ESTABLISHMENT OF THE PHYSIORAY EDITORIAL BOARD',
        listItems: [{
          list: '',
          sublistItems: [
            'There shall be a board called the Physioray Editorial Board, which shall be responsible for production, distribution and circulation of the Journal of the Association - PHYSIORAY, which will hitherto be referred to as Physioray.',
            'The journal shall remain the journal of APS and the activities of the Physioray Editorial Board shall be subjected to the provisions of this constitution and the decisions of the Association.',]
        },
        {
          list: 'FUNCTIONS',
          sublistItems: [
            '• Shall work for the production of each edition of Physioray. ',
            '• Shall in conjunction with the Executive Council launch each edition of Physioray.',
            '• Shall see to distribution and circulation of the journal',
            '• Shall perform other functions beneficial to Physioray and APS',]
        },
        {
          list: 'OFFICERS OF PHYSIORAY EDITORIAL BOARD',
          sublistItems: [
            'There shall be officers in the board that will perform functions as assigned them thereby guiding the editorial board. Note: The provisions of the rules and regulations must not in any way contradict the provisions of the constitution.',]
        },
        {
          list: 'MEMBERSHIP',
          sublistItems: [
            '• Physioray shall recruit her members from the financial members of the Association in a formal way as provided by the rules of the Board.',
            '• The board shall be headed by the Editor-in-Chief who shall be elected by the members of the board. The Editor-in-chief shall come from the final year class.',]
        },
        {
          list: 'FINANCE',
          sublistItems: [
            '• The financial transactions of the board shall be performed by the appropriate officers.',
            '• Shall present a budget to the Executive Council at the beginning of every session which shall be subject to ratification by the Senate. ',
            '• The board shall raise funds from:',
            '1. Subventions from the Executive Council',
            '1. Subventions from the Executive Council',
            'III. Adverts and a percentage of the money realized during the launching/sales of each edition of the journal. ',]
        },]
      },
    ]
  },


  {
    name: 'ARTICLE 8: THE PHYSIOTHERAPY PRESS',
    page: 8,
    subArray: [
      {
        section: 'SECTION A',
        listItems: [{
          list: '',
          sublistItems: ['There shall be a body within the Association, called the Physiotherapy Press, herein referred to as the Physio Press.',
          ],
        },
        {
          list: 'POWERS AND FUNCTIONS',
          sublistItems: ['• The Physio Press shall be governed according to the provisions of its constitution which shall be the supreme document binding on all its members.',
            '• Shall be responsible to the APS Senate',
            '• Shall be an independent body from the Executive Council of the APS.',
            '• Shall enjoy an annual subvention from the Executive Council of the APS',
            '• Shall be responsible for managing all APS information boards.',
            '• Shall perform its role dutifully well without causing an embarrassment to the APS as a body.',
            '• Shall be headed by the Editor-in-Chief who shall come from the final year class',
            '• Shall be responsible for the publication of all materials of the Association.',
            '• Shall be the information dissemination organ of the Association. Shall enlighten, informand entertain members of the Association.',
            '• Shall not be eligible to contest for any electoral post unless he/she resigns.',],
        },
        ]
      },
      {
        section: 'SECTION B: MEMBERSHIP',
        listItems: [{
          list: '',
          sublistItems: [
            '• Members shall be interested financial members of the Association.',
            '• Members shall be fully bound by the articles of the Press constitution.',
            '• Members shall enjoy all the privileges outlined in the provision of the Physiotherapy Press constitution.']
        }]
      },
      {
        section: 'SECTION C: THE EDITORIAL BOARD',
        listItems: [{
          list: 'CITATION AND SUPREMACY OF THE CONSTITUTION',
          sublistItems: [
            '•The press shall constitute an intra-controlling body known as the Editorial Board.',
            '•All the electoral board members shall perform their roles as specified in the articles of the Physiotherapy Press Constitution',]
        },
        {
          list: '•The recognized members of the editorial board who shall be elected or chosen by the members of the Physiopress shall be: ',
          sublistItems: [
            'I. The Editor-in-Chief (who shall be the Chairman of the Editorial Board and must be in the final year class',
            'II. The General Editor ',
            'Ill. The Board Secretary',
            'IV. Features and News Editor',
            'V. Financial Manager',
            'VI. Business Manager',
            'VII. Sports Editor',
            'VIII. News Correspondent',
            'IX. Press Librarian',
          ]
        },]
      },
      {
        section: 'SECTION D: PRESS YEAR',
        listItems: [{
          list: 'The press year shall be for one academic session. Election of the new editorial board members must be held at least three weeks to the end of an academic session.',
          sublistItems: [
            '',]
        },
        ]
      },

    ]
  },


  {
    name: 'ARTICLE 9: COMMITTEES AND AWARDS',
    page: 9,
    subArray: [
      {
        section: 'SECTION A: NAMES OF COMMITTEES',
        listItems: [{
          list: '',
          sublistItems: ['(I) Standing Committee ',
            '(II)Ah-hoc Committee',
          ],
        },
        ]
      },
      {
        section: 'SECTION B: COMPOSITION AND FUNCTIONS',
        listItems: [{
          list: '(I) Standing Committee',
          sublistItems: [
            '1. Physiotherapy Week Committee',
            '• Shall be headed by the Vice President.',
            '• Shall be responsible for the organization of the Physiotherapy Health Week Programmes and other entertainment(s), approved by the Executive Council with the consent of the APS Senate.',
            '• The Social Secretary and Public Relations Officer shall also be members of the committee.',
          ]
        },
        {
          list: '(II) Ad-hoc Committee',
          sublistItems: [
            '• The Executive Council shall appoint as many committees necessary (e.g. Disciplinary, Audit, Awards etc.) as in its judgment to which it may delegate any of its functions, but no decision of such committee(s) shall have effect unless confirmed by the APS Senate.',
            '• The committee shall also be given a term of reference.',
            '• The membership of an Ad-hoc committee shall consist of five (5) non-executive members, one from each level of the Association, appointed by the Executive Council and approved by the Senate.',
            '• The Ad-hoc committee stands dissolvable upon the completion of its task or at the instance of the Senate.',
          ]
        },
        {
          list: 'Auditing Committee ',
          sublistItems: [
            '• An auditing committee shall be appointed by the Senate latest two (2) months before the end of the tenure of every Executive Council to audit the account of the Association and shall read such conducted at the congress meeting.',
            '• The auditing committee members shall be non-members of the Executive Council and the Senate.',
          ]
        }]
      },
      {
        section: 'SECTION C: MEETINGS',
        listItems: [{
          list: '',
          sublistItems: [
            '• Frequency of meetings shall be decided by the head of the committee.',
            '• The President of the Association and the Senate President may be conscripted to all APS committee meetings.',
            '• Shall be directed by its Chairperson.',
            '• Shall be directed by its Chairperson.',
            '• The resolution of the disciplinary committee should be submitted to the Senate President for necessary actions.',
            '• The resolutions of the committee other than the disciplinary committee shall be submitted to the Executive Council through the President, who shall in turn present same to the Senate in duplicate as stated in other provisions of this constitution.',]
        }]
      },
      {
        section: 'SECTION D: AWARDS',
        listItems: [{
          list: 'Awards shall be given to: ',
          sublistItems: [
            '• Out-going members of both the Executive Council and the Senate and other members of the Association who have distinguished themselves and rendered meritorious services to the Association.',
            '• Patron(s), Matron(s), Adviser(s) and others who have contributed to the growth of Physiotherapy with the discretion of the Executive Council to be approved by the Senate.',]
        }]
      },
    ]
  },


  {
    name: 'ARTICLE 10: CONGRESS MEETING',
    page: 10,
    subArray: [
      {
        section: 'SECTION A: ORDINARY CONGRESS MEETING',
        listItems: [{
          list: '',
          sublistItems: ['• There shall be at least a congress meeting every semester',
            '• One-third (1/3) of the total members of the Association shall constitute a quorum of every congress meeting, and the following stakeholders are mandated to be present: all the members of the Executive council, all senators, Chairperson and secretary of the electoral commission, Editor in Chief of the PhysioPress and Physioray.',
            '• All issues must be fully debated in the congress meeting after which it shall be put to vote before it is adopted.',
            '• The President, the General Secretary, the Senate President and the Clerk of the Senateshall draw the addenda for the meetings.',
          ],
        },
        ]
      },
      {
        section: 'SECTION B: EMERGENCY MEETINGS',
        listItems: [{
          list: '',
          sublistItems: [
            'There shall be emergency meetings as the need arises and shall be summoned either by the President or the Senate President, subject to the provisions made by the relevant articles of this constitution.',]
        }]
      },
      {
        section: 'SECTION C: VOTINGS AT MEETINGS',
        listItems: [{
          list: 'CITATION AND SUPREMACY OF THE CONSTITUTION',
          sublistItems: [
            '• Voting at the congress shall be by the show of hands except when a member presses for a secret ballot or when new Executive Council Members are being selected.',
            '• In the event of a tie, the Senate President shall have a casting vote. ',
            '• During voting of new Executives, only the members of the Electoral Commission shall lose their voting rights.']
        }]
      },
    ]
  },


  {
    name: 'ARTICLE 11: FINANCE',
    page: 11,
    subArray: [
      {
        section: 'SECTION A: SOURCES OF FUNDS GENERATION',
        listItems: [{
          list: 'Funds shall be generated for the Association from:',
          sublistItems: ['I Annual dues',
            'II Fund raising activities',
            'III Donations from Philanthropists',
          ],
        },
        ]
      },
      {
        section: 'SECTION B: DUES AND EXTRA DUES',
        listItems: [{
          list: '',
          sublistItems: [
            'I. The annual dues by members shall be dictated from time to time by the Executive Council and approved by the Senate.',
            'II. The amount to be paid for dues shall be determined before the beginning of a new session',
            'III. Any extra dues suggested by the Executive Council must be approved by two-thirds (2/3) majority of the Senate.']
        }]
      },
      {
        section: 'SECTION C: BANKER',
        listItems: [{
          list: '',
          sublistItems: [
            'i. All monies received on behalf of the Association shall be kept at any reputable bank. ',
            'ii. Any change shall be approved by the Senate.',]
        }]
      },
      {
        section: 'SECTION D: SIGNATORIES',
        listItems: [{
          list: 'The following officers shall be the signatories to the Associations account;',
          sublistItems: [
            'I. The President',
            'II. The Financial Secretary',
            'III. The Treasurer',
            'The President shall be the principal signatory to the Association"s account',]
        }]
      },
      {
        section: 'SECTION E: DISBURSEMENT OF FUNDS',
        listItems: [{
          list: 'The Executive Council shall disburse Associations funds:',
          sublistItems: [
            '• If approval of such funds (i.e. budget, capital project) has been made by the Senate',
            '• As in other cases as may be required for the day-to-day running of the Association which must be well documented.',
            '• Funds generated by the Executive Council from Physiotherapy lecturers and clinicians shall be shared as follows:',
            '•25% of such fund will be given to the Physioray editorial Board.',
            '•15% of such fund will be given to the Physio Press.',
            '• 60% of such funds shall be for the Executive Council.',]
        }]
      },
    ]
  },


  {
    name: 'ARTICLE 12: AMENDMENT',
    page: 12,
    subArray: [
      {
        section: '',
        listItems: [{
          list: '',
          sublistItems: ['This constitution is subject to amendment and such amendment must be approved by two-thirds (2/3) majority of the congress. This constitution shall be binding on all members of the Association henceforth as APS Constitution',
            'The no of years for review of the constitution is minimum of 5 years'
          ],
        },

        ]
      },
    ]
  },


  {
    name: 'ASSOCIATION OF PHYSIOTHERAPY STUDENTS OATH OF OFFICE',
    page: 13,
    subArray: [
      {
        section: '',
        listItems: [{
          list: '',
          sublistItems: ['I, (name) do solemnly swear (or affirm) that I will faithfully execute the Office of (state your office) of the Association of Physiotherapy Students. I will strive to uphold the image of this great association, and I Promise to preserve, protect and defend the constitution of the Association of Physiotherapy Students to the best of my ability. So help me God.'
          ],
        },

        ]
      },
    ]
  },

]);

const currentSlide = ref(0);
const selectedSection = ref(0);

const settings = ref({
  itemsToShow: 1,
  itemsToScroll: 1,
  snapAlign: 'center',
});

const breakpoints = ref({
  768: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
});

// Function to navigate to the selected section
const navigateToSection = () => {
  currentSlide.value = selectedSection.value;
};

// Function to handle slide change
const slideTo = (val) => {
  selectedSection.value = val;
  currentSlide.value = val;
};

// Watch for changes in currentSlide and update selectedSection accordingly
watch(currentSlide, (newValue) => {
  selectedSection.value = newValue;
});
</script>

<style scoped>
.carousel__slide {
  padding: 20px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>