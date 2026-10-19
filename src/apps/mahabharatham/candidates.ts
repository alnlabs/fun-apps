const teluguHeroes = [
  'Prabhas',
  'Allu Arjun',
  'Jr NTR',
  'Ram Charan',
  'Mahesh Babu',
  'Pawan Kalyan',
  'Chiranjeevi',
  'Nagarjuna',
  'Venkatesh',
  'Balakrishna',
  'Nani',
  'Vijay Deverakonda',
  'Ram Pothineni',
  'Ravi Teja',
  'Sharwanand',
  'Nithiin',
  'Sai Dharam Tej',
  'Nandamuri Kalyan Ram',
  'Teja Sajja',
  'Panja Vaisshnav Tej',
]

const tamilHeroes = [
  'Suriya',
  'Vijay',
  'Ajith Kumar',
  'Karthi',
  'Dhanush',
  'Vikram',
  'Kamal Haasan',
  'Jayam Ravi',
  'Sivakarthikeyan',
  'Vijay Sethupathi',
  'Silambarasan',
  'Ashok Selvan',
]

const malayalamMen = [
  'Mohanlal',
  'Mammootty',
  'Dulquer Salmaan',
  'Prithviraj Sukumaran',
  'Tovino Thomas',
  'Fahadh Faasil',
]

const hindiHeroes = [
  'Hrithik Roshan',
  'Ranbir Kapoor',
  'Ranveer Singh',
  'Vicky Kaushal',
  'Shah Rukh Khan',
  'Aamir Khan',
  'Salman Khan',
  'Akshay Kumar',
  'Tiger Shroff',
  'Varun Dhawan',
  'Kartik Aaryan',
  'Ayushmann Khurrana',
  'Rajkummar Rao',
  'Sidharth Malhotra',
  'Ishaan Khatter',
  'Yash',
]

const characterMen = [
  'Vijay Sethupathi',
  'Fahadh Faasil',
  'Manoj Bajpayee',
  'Pankaj Tripathi',
  'Nawazuddin Siddiqui',
  'Prakash Raj',
  'Saikumar',
  'Jagapathi Babu',
  'Nassar',
  'Rao Ramesh',
  'Murali Sharma',
  'Jayaram',
  'Siddique',
  'Samuthirakani',
  'Paresh Rawal',
  'Anupam Kher',
]

const seniorMen = [
  'Amitabh Bachchan',
  'Kamal Haasan',
  'Chiranjeevi',
  'Mohanlal',
  'Mammootty',
  'Nagarjuna',
  'Venkatesh',
  'Balakrishna',
  'Naseeruddin Shah',
  'Anupam Kher',
  'Prakash Raj',
  'Jagapathi Babu',
  'Saikumar',
  'Nassar',
  'Sathyaraj',
  'Jayaram',
]

const youngMen = [
  'Vijay Deverakonda',
  'Teja Sajja',
  'Sharwanand',
  'Nithiin',
  'Sai Dharam Tej',
  'Nandamuri Kalyan Ram',
  'Panja Vaisshnav Tej',
  'Dulquer Salmaan',
  'Tovino Thomas',
  'Karthi',
  'Dhanush',
  'Ashok Selvan',
  'Tiger Shroff',
  'Varun Dhawan',
  'Kartik Aaryan',
  'Ishaan Khatter',
  'Sidharth Malhotra',
]

const heroines = [
  'Sai Pallavi',
  'Rashmika Mandanna',
  'Samantha',
  'Keerthy Suresh',
  'Nayanthara',
  'Anushka Shetty',
  'Pooja Hegde',
  'Tamannaah Bhatia',
  'Kajal Aggarwal',
  'Shruti Haasan',
  'Nivetha Thomas',
  'Mrunal Thakur',
  'Sobhita Dhulipala',
  'Aditi Rao Hydari',
  'Trisha',
  'Shriya Saran',
  'Alia Bhatt',
  'Deepika Padukone',
  'Priyanka Chopra Jonas',
  'Kareena Kapoor Khan',
  'Katrina Kaif',
  'Kriti Sanon',
  'Kiara Advani',
  'Tripti Dimri',
  'Janhvi Kapoor',
  'Anushka Sharma',
  'Parvathy Thiruvothu',
  'Manju Warrier',
  'Aishwarya Rai Bachchan',
]

const seniorWomen = [
  'Tabu',
  'Ramya Krishnan',
  'Revathi',
  'Suhasini Maniratnam',
  'Jayasudha',
  'Radikaa Sarathkumar',
  'Meena',
  'Vidya Balan',
  'Shabana Azmi',
  'Rekha',
  'Dimple Kapadia',
  'Ratna Pathak Shah',
  'Jaya Bachchan',
  'Nayanthara',
  'Anushka Shetty',
]

function list(...groups: string[][]): string[] {
  const seen = new Set<string>()
  const names: string[] = []
  for (const group of groups) {
    for (const name of group) {
      const key = name.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      names.push(name)
    }
  }
  return names
}

export const allActors = list(
  teluguHeroes,
  tamilHeroes,
  malayalamMen,
  hindiHeroes,
  characterMen,
  seniorMen,
  youngMen,
  heroines,
  seniorWomen,
)

const warriors = list(teluguHeroes, tamilHeroes, malayalamMen, hindiHeroes)
const elders = list(seniorMen, characterMen)
const youngWomen = list(heroines)

const directors = [
  'S. S. Rajamouli',
  'Trivikram Srinivas',
  'Sukumar',
  'Koratala Siva',
  'Nag Ashwin',
  'Prasanth Varma',
  'Boyapati Srinu',
  'Puri Jagannadh',
  'Mani Ratnam',
  'Lokesh Kanagaraj',
  'Shankar',
  'Vetrimaaran',
  'Atlee',
  'Mari Selvaraj',
  'Rajkumar Hirani',
  'Sanjay Leela Bhansali',
  'Zoya Akhtar',
  'Lijo Jose Pellissery',
]

const musicDirectors = [
  'M. M. Keeravani',
  'Devi Sri Prasad',
  'S. Thaman',
  'Anirudh Ravichander',
  'A. R. Rahman',
  'Ilaiyaraaja',
  'Yuvan Shankar Raja',
  'Santhosh Narayanan',
  'Pritam',
  'Amit Trivedi',
  'Sushin Shyam',
]

const lyricists = [
  'Chandrabose',
  'Ramajogayya Sastry',
  'Anantha Sriram',
  'Bhaskarabhatla',
  'Sirivennela Seetharama Sastry',
  'Vairamuthu',
  'Madhan Karky',
  'Thamarai',
  'Irshad Kamil',
  'Gulzar',
  'Javed Akhtar',
  'Amitabh Bhattacharya',
]

const producers = [
  'Allu Aravind',
  'Dil Raju',
  'D. V. V. Danayya',
  'Shobu Yarlagadda',
  'Prasad Devineni',
  'Naga Vamsi',
  'Karan Johar',
  'Aditya Chopra',
]

const writers = [
  'Vijayendra Prasad',
  'Sai Madhav Burra',
  'Kona Venkat',
  'Trivikram Srinivas',
  'Sukumar',
  'Anand Neelakantan',
  'Salim Khan',
]

const cinematographers = [
  'K. K. Senthil Kumar',
  'R. Rathnavelu',
  'P. S. Vinod',
  'Santosh Sivan',
  'Ravi K. Chandran',
  'Sudeep Elamon',
]

const editors = ['Kotagiri Venkateswara Rao', 'A. Sreekar Prasad', 'Naveen Nooli']

const costumeDesigners = ['Neeta Lulla', 'Dolly Ahluwalia', 'Anju Modi']

const productionDesigners = ['Sabu Cyril', 'Rajeevan', 'Annapurna Parameswaran']

const choreographers = ['Prem Rakshith', 'Jani Master', 'Prabhu Deva', 'Farah Khan', 'Sekhar Master']

const vfxSupervisors = ['V. Srinivas Mohan', 'R. C. Kamalakannan']

export const allCrew = list(
  directors,
  musicDirectors,
  lyricists,
  producers,
  writers,
  cinematographers,
  editors,
  costumeDesigners,
  productionDesigners,
  choreographers,
  vfxSupervisors,
)

export const candidates: Record<string, string[]> = {
  yudhishthira: list(
    ['Mahesh Babu', 'Prabhas', 'Aamir Khan', 'Mohanlal', 'Dulquer Salmaan', 'Nani', 'Kamal Haasan'],
    warriors,
  ),
  bhima: list(
    ['Jr NTR', 'Prabhas', 'Balakrishna', 'Vikram', 'Yash', 'Salman Khan', 'Ravi Teja', 'Ajith Kumar'],
    warriors,
  ),
  arjuna: list(
    ['Prabhas', 'Allu Arjun', 'Ram Charan', 'Hrithik Roshan', 'Suriya', 'Mahesh Babu', 'Jr NTR'],
    warriors,
  ),
  nakula: list(youngMen, ['Dulquer Salmaan', 'Sharwanand', 'Nithiin', 'Vijay Deverakonda']),
  sahadeva: list(youngMen, ['Nani', 'Dulquer Salmaan', 'Fahadh Faasil', 'Rajkummar Rao']),
  draupadi: youngWomen,
  kunti: list(seniorWomen, ['Tabu', 'Ramya Krishnan', 'Revathi', 'Vidya Balan']),
  abhimanyu: list(youngMen, ['Teja Sajja', 'Tiger Shroff', 'Ishaan Khatter', 'Vijay Deverakonda']),
  ghatotkacha: list(
    ['Ravi Teja', 'Yash', 'Vikram', 'Jr NTR', 'Balakrishna', 'Tovino Thomas', 'Vijay Sethupathi'],
    youngMen,
  ),
  krishna: list(
    ['Prabhas', 'Mahesh Babu', 'Hrithik Roshan', 'Dulquer Salmaan', 'Allu Arjun', 'Kamal Haasan', 'Nani'],
    warriors,
  ),
  subhadra: youngWomen,
  ekalavya: list(
    ['Vijay Sethupathi', 'Dhanush', 'Fahadh Faasil', 'Nani', 'Karthi', 'Vicky Kaushal', 'Prithviraj Sukumaran'],
    youngMen,
  ),
  duryodhana: list(
    ['Jr NTR', 'Prabhas', 'Yash', 'Ranveer Singh', 'Vikram', 'Ajith Kumar', 'Pawan Kalyan'],
    warriors,
  ),
  dushasana: list(
    ['Vijay Deverakonda', 'Karthi', 'Tovino Thomas', 'Ram Pothineni', 'Varun Dhawan', 'Silambarasan'],
    youngMen,
  ),
  shakuni: list(characterMen, ['Vijay Sethupathi', 'Fahadh Faasil', 'Nawazuddin Siddiqui', 'Prakash Raj']),
  karna: list(
    ['Prabhas', 'Suriya', 'Allu Arjun', 'Ranbir Kapoor', 'Vicky Kaushal', 'Prithviraj Sukumaran', 'Dhanush'],
    warriors,
  ),
  ashwatthama: list(
    ['Vijay Sethupathi', 'Fahadh Faasil', 'Dhanush', 'Karthi', 'Vicky Kaushal', 'Nani', 'Prithviraj Sukumaran'],
    youngMen,
  ),
  bhishma: elders,
  dronacharya: elders,
  dhritarashtra: elders,
  gandhari: list(seniorWomen, ['Tabu', 'Ramya Krishnan', 'Shabana Azmi', 'Rekha']),
  vidura: list(characterMen, seniorMen, ['Nani', 'Aamir Khan', 'Rajkummar Rao', 'Fahadh Faasil']),
  director: directors,
  producer: producers,
  screenwriter: writers,
  'dialogue-writer': writers,
  'music-director': musicDirectors,
  lyricist: lyricists,
  cinematographer: cinematographers,
  editor: editors,
  'costume-designer': costumeDesigners,
  'production-designer': productionDesigners,
  choreographer: choreographers,
  'vfx-supervisor': vfxSupervisors,
}

export function candidatesFor(roleId: string): string[] {
  return candidates[roleId] ?? []
}
