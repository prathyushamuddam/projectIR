<?php

	class Cl_Qcollection
	{
		protected $_con;

		public function(){
			$db = new Cl_DBclass();
			$this->con = $db->con;
		}


		public function writtenqueries{
				if(!empty($data))
			// TODO 
		}

	}

 ?>