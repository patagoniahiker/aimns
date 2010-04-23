using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web.Mvc;
using AIMNS.DTO;
using AIMNS.Model;
using AIMNS.DTO.Mappers;
using System.Web.UI;

namespace AIMNS.Controllers
{
    public class MenuNode
    {
        private string id = "";
        private string name = "";
        private bool leaf = true;
        private List<MenuNode> children = new List<MenuNode>();
        private string url = "";
        
        public MenuNode( string id, string name )
        {
            this.id = id;
            this.name = name;
        }

        public MenuNode(string id, string name, string url)
        {
            this.id = id;
            this.name = name;
            this.url = url;
        }

        public string ID
        {
            get{ return id; }
            set{ id = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public bool Leaf
        {
            get { return leaf; }
            set { leaf = value; }
        }

        public string Url
        {
            get { return url; }
            set { url = value; }
        }

        public List<MenuNode> Children
        {
            get { return children; }
            set { children = value; }
        }
    }

    public class MenuNodeList : BaseController
    {
        private string userId = "";
        public MenuNodeList( string userId )
        {
            this.userId = userId;
        }

        private Dictionary<string, MenuNode> nodeList = new Dictionary<string, MenuNode>();
        
        public IList GetMenuNodeList()
        {
            IList rootList =  new ArrayList();
            ArrayList functionlist = ManagerFactory.UserManager.GetPermissionList(userId) as ArrayList;

            foreach (object[] fuc in functionlist)
            {
                string id = fuc[0].ToString();
                int index = id.IndexOf("0");
                int length = id.Length;
                
                if( nodeList.Count == 0 )
                {
                    if( index != 1 )
                        continue;

                    if( IsCorrect( id, index )){
                        MenuNode node = new MenuNode(id, fuc[1].ToString(), fuc[2].ToString());
                        nodeList.Add( id, node );

                        rootList.Add( node );
                    }
                    continue;
                }

                if( index == 1 )
                {
                    if( !nodeList.ContainsKey( id ))
                    {
                        if( IsCorrect( id, index )){
                            MenuNode node = new MenuNode(id, fuc[1].ToString(), fuc[2].ToString());
                            nodeList.Add( id, node );
                            rootList.Add( node );
                        }
                    }
                }
                else
                {
                    string parentId = "";
                    if( index != - 1)
                        parentId = id.Substring( 0, ( index - 1 ));    
                    else
                        parentId = id.Substring( 0, ( length - 1 ));
                    
                    parentId = parentId.PadRight( length , '0' );
                    if( nodeList.ContainsKey( parentId ))
                    {
                        if( IsCorrect( id, index )){
                            MenuNode node = new MenuNode(id, fuc[1].ToString(), fuc[2].ToString());
                            nodeList.Add( id, node );

                            nodeList[ parentId ].Children.Add( node );
                            nodeList[ parentId ].Leaf = false;
                        }
                    }                
                }    
            }
            return rootList;
        }

        public MenuNode GetCurrentRootNode(string id)
        {
            IList rootList = GetMenuNodeList();
            foreach (MenuNode node in rootList)
            {
                if( node.ID.Equals( id ))
                    return node;
            }
            return null;
        }

        public bool IsCorrect( string id, int index )
        {
            if( index != -1 )
            {
                string str = id.Substring( index, ( id.Length - index ));
                if( int.Parse( str ) == 0 )
                    return true;

                return false;
            }
            return true;
        }
    }
}
